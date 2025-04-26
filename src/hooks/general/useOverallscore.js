

import { useDispatch, useSelector } from "react-redux";


import { 
    query,
    getDocs,
    collection,
    where,
    doc,
    updateDoc      
} from "firebase/firestore";

//
import { db } from '../../Firebase'

// states
import { setUser } from "../../redux/userSlice";
import { gtSuccess, gtError  } from "../../redux/gtstatusSlice";
import { setgtMessage } from './../../redux/gtmsgSlice';
import { stopLoading, startLoading } from "../../redux/loadingSlice";




export const useOverallscore = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()


    // let's deal saturday check first

    // ---get most recent saturday
    function getLastSaturday(date = new Date()) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = day >= 6 ? day - 6 : 7 + day - 6; // Days since last Saturday
        d.setDate(d.getDate() - diff);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    // ---check if weekly wellness should run
    function shouldRunWeeklyWellness(lastCheckTimestamp) {
        const now = new Date();
        const lastSaturday = getLastSaturday();
      
        // If user visited before last Saturday, we need to run it again
        const lastCheckDate = new Date(lastCheckTimestamp || 0);
        return lastCheckDate < lastSaturday;
    }
    // group scores by days
    function groupScoresByWeekday(allScores) {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
        const grouped = {};
      
        for (const scoreObj of allScores) {
          const date = new Date(scoreObj.thedate);
          const dayName = weekdays[date.getDay()];
      
          if (!grouped[dayName]) {
            grouped[dayName] = {};
          }
      
          // Loop through the scores (excluding the date key)
          for (const [key, value] of Object.entries(scoreObj)) {
            if (key === 'thedate') continue;
      
            if (!grouped[dayName][key]) {
              grouped[dayName][key] = [];
            }
      
            grouped[dayName][key].push(value);
          }
        }
      
        return grouped;
    }
    
    const fetchAIScores = async (prompt) => {
        // actual api call to ai
        const requestBody = {
            model: "gpt-4o",
            messages: [
                { role: "system", content: `You are an assistant that returns only the calculated numeric scores in JSON format. Do not include any explanation or commentary.` },
                { role: "user", content: `${prompt}` }
            ],
            temperature: 0.7,
            max_tokens: 200,
            top_p: 0.9,
            frequency_penalty: 0.3,
            presence_penalty: 0.3
        };

        try {
            const response = await fetch(`https://rosaapidemo.onrender.com/api/gpt`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Error generating response:", error);
            return `ai encountered an error generating a response.`;
        }
    }

    function extractJSONOnly(text) {
        const jsonEndIndex = text.indexOf('}') + 1; // Find the end of the first JSON object
        if (jsonEndIndex === 0) {
          throw new Error('Could not find closing brace for JSON');
        }
      
        const jsonString = text.slice(0, jsonEndIndex);
        return JSON.parse(jsonString);
    }

    const handleAiOverallscore = async () => {
        try {
            if(user) {
                if(user.all_scores) {
                    
                    const lastCheck = localStorage.getItem('lastWellnessCheck');

                    if (shouldRunWeeklyWellness(lastCheck)) {
                        dispatch(startLoading())
                        // ✅ Trigger your wellness logic here
                        console.log('🧠 Running weekly wellness summary...');

                        const weeklyGroupedScores = groupScoresByWeekday(user.all_scores)
                        const now = new Date().getTime()

                        // console.log(weeklyGroupedScores)

                        const promptDemo = `
Here is a summary of a user's mood scores for each day of the week:
${JSON.stringify(weeklyGroupedScores, null, 1)}

Based on this data:
1. Calculate a single total wellness score (1–100) for each day of the week (use 0 for any day that is missing from the object).
2. Do not include any explanations or nested objects under the day keys. Each day should have only a single number as the value.
3. After the day scores, include three additional sections:
   - personalizedCopingStrategies: A message and a list of **3 short one-word or two-word** strategies (e.g., “Mindfulness”, “Breathing”, “Focus”).
   - lifestyleAdjustments: A message and a list of **3 short one-word or two-word** lifestyle suggestions (e.g., “Hydration”, “Walking”, “Stretching”).
   - therapySuggestions: A message and a list of **3 short one-word or two-word** therapy suggestions (e.g., “CBT”, “Talk therapy”, “Support group”).

Please return your response in the following strict format:
{
  "sunday": number,
  "monday": number,
  "tuesday": number,
  "wednesday": number,
  "thursday": number,
  "friday": number,
  "saturday": number,
  "personalizedCopingStrategies": {
    "message": "string",
    "suggestions": ["string", "string", "string"]
  },
  "lifestyleAdjustments": {
    "message": "string",
    "suggestions": ["string", "string", "string"]
  },
  "therapySuggestions": {
    "message": "string",
    "suggestions": ["string", "string", "string"]
  }
}          
                            `

                        const airesponse = await fetchAIScores(promptDemo)
                        const cleaned = airesponse.replace(/```json|```/g, '').trim()
                        const cleanJSON = JSON.parse(cleaned);
                        console.log(cleanJSON)

                        // updatefirestore
                         // query user docs to update
                         const userquery = query(collection(db, "usersdetails"), where("username", "==", user.username))
                         // execute the query
                         const userquerySnapshot = await getDocs(userquery);
             
                         if (!userquerySnapshot.empty) {
                            // get the first matching document (assuming usernames are unique)
                            const userDoc = userquerySnapshot.docs[0];
                            const userDocRef = doc(db, "usersdetails", userDoc.id);
            
                            const updatedData = { weekly_score_details: cleanJSON, lastActivity: now }
                
                            // Update the document with the new data
                            await updateDoc(userDocRef, updatedData);
            
                            // update states
                            var itemUpdate = { ...user, weekly_score_details: cleanJSON, lastActivity: now }
                            dispatch(setUser(itemUpdate))
                            dispatch(gtSuccess())
                            dispatch(setgtMessage(`weekly scores handled`))
                            console.log(`weekly scores fetched, stored, and updated successfully`);
                            // Update the last check time to the most recent Saturday
                            localStorage.setItem('lastWellnessCheck', getLastSaturday().toISOString());
                            dispatch(stopLoading())
                         } else {
                            dispatch(gtError())
                            dispatch(setgtMessage(`no user found with username "${user.username}".`))
                            console.log(`no user found with username "${user.username}".`);
                            dispatch(stopLoading())
                         }
                    } else {
                        console.log('✅ Already checked for this week');
                    }

                }
            }

        } catch (err) {
            console.log('try catch err: ', err)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            dispatch(stopLoading())
        }
    }

    return { handleAiOverallscore }


}










