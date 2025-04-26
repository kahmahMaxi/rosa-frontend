

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




export const useAiscore = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()

    const yesOptionsFilter = (question) => {
        const filter = user.mood_logs.filter(log => log.question === question && log.answer === 'yes')
        return filter.length
    }

    const levelOptionFilter = (question) => {
        const levelsFilter = user.mood_logs.filter(item => item.question === question)
        const levelsStr = levelsFilter.map(log => log.answer).join(', ')
        return levelsStr
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
            // if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            //     throw new Error(`Invalid response format: ${JSON.stringify(data, null, 2)}`);
            // }

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

    const handleAiscore = async () => {
        try {
            if(user) {
                if(user.mood_logs) {
                    if(user.mood_logs.length === 16 || user.mood_logs.length === 32 || user.mood_logs.length === 48 || user.mood_logs.length === 64 || user.mood_logs.length > 80) {
                        console.log('prompt ai')
                        dispatch(startLoading())
                        const now = new Date().getTime()
    
                        // preprocess logs to summary
                        const totalLogs = user.mood_logs.length
                        // const breaksFilter = user.mood_logs.filter(item => item.question === 'Have you taken a break for yourself today?' && item.answer === 'yes')
                        const breaksTaken = yesOptionsFilter('Have you taken a break for yourself today?')
                        const nourishingMeals = yesOptionsFilter('Have you eaten something nourishing today?')
                        const stressLevels = levelOptionFilter('How stressed do you feel right now?')
                        const moodFeelings = levelOptionFilter('How are you feeling emotionally right now?')
                        const anxiousFeel = yesOptionsFilter('Have you felt anxious or stressed today?')
                        const sleepValues = levelOptionFilter('How did you sleep last night?')
                        const energyLevels = levelOptionFilter('How’s your energy level today?')
                        const feelConnected = yesOptionsFilter('Are you feeling connected to others?')
                        const worriedTimes = yesOptionsFilter('Is anything worrying you right now?')
                        const bodyMovements = levelOptionFilter('Have you moved your body today?')
                        const hopefulFeel = yesOptionsFilter('Are you feeling hopeful about the future?')
                        const productiveFeel = yesOptionsFilter('Do you feel productive today?')
                        const calmFeel = levelOptionFilter('Is your mind feeling calm or overwhelmed?')
                        const focusedLevels = levelOptionFilter('How focused or clear-minded are you today?')
                        const safeFeeling = yesOptionsFilter('Do you feel safe and secure today?')
                        const joyMoments = yesOptionsFilter('Have you had a moment of joy today?')
    
                        const promptDemo = `
    Here is a summary of a user's mood logs (${totalLogs} entries):
    • Breaks taken: ${breaksTaken}
    • Nourishing meals: ${nourishingMeals} times
    • Stress levels: ${stressLevels}
    • Moods reported: ${moodFeelings}
    • Anxious feelings: ${anxiousFeel}
    • Sleep quality entries: ${sleepValues}
    • Energy levels: ${energyLevels}
    • Feeling connected to others: ${feelConnected} times
    • Worrying reported: ${worriedTimes} times
    • Body movement: ${bodyMovements}
    • Feeling hopeful: ${hopefulFeel} times
    • Feeling productive: ${productiveFeel} times
    • Feeling calm or overwhelmed: ${calmFeel}
    • Focus levels: ${focusedLevels}
    • Feeling safe and secure: ${safeFeeling} times
    • Moments of joy: ${joyMoments} times
    
    Based on this, calculate the following wellness-related scores out of 100:
    
    {
      "dailyWellnessScore": number,
      "physicalHealthScore": number,
      "mentalStateScore": number,
      "sleepQualityScore": number,
      "stressLevelScore": number,
      "anxietyManagementScore": number,
      "depressionSupportScore": number,
      "stressReductionScore": number,
      "selfCareScore": number,
      "moodLevelScore": number
    }
    
    Do not worry about values that are zero or empty — the user hasn't provided them yet. You can estimate scores based on the available entries and frequency/pattern of certain answers.
                    `
    
                        // console.log(promptDemo)

                        const airesponse = await fetchAIScores(promptDemo)
                        // Remove the triple backticks and 'json'
                        const cleaned = airesponse.replace(/```json|```/g, '').trim()
                        const cleanJSON = JSON.parse(cleaned);
                        console.log(cleanJSON)

                        // query user docs to update
                        const userquery = query(collection(db, "usersdetails"), where("username", "==", user.username))
                        // execute the query
                        const userquerySnapshot = await getDocs(userquery);
            
                        if (!userquerySnapshot.empty) {
                            // get the first matching document (assuming usernames are unique)
                            const userDoc = userquerySnapshot.docs[0];
                            const userDocRef = doc(db, "usersdetails", userDoc.id);
        
                            const prevphyscore = user.current_scores ? user.current_scores.physicalHealthScore || 0 : 0
                            const prevmtscore = user.current_scores ? user.current_scores.mentalStateScore || 0 : 0
                            const prevsqscore = user.current_scores ? user.current_scores.sleepQualityScore || 0 : 0
                            const prevstlscore = user.current_scores ? user.current_scores.stressLevelScore || 0 : 0

                            const phydiff = cleanJSON.physicalHealthScore - prevphyscore
                            const mtdiff = cleanJSON.mentalStateScore - prevmtscore
                            const sqdiff = cleanJSON.sleepQualityScore - prevsqscore
                            const stldiff = cleanJSON.stressLevelScore - prevstlscore

                            const prevScores = user.all_scores ? user.all_scores || [] : []
                            const newallscores = [...prevScores, { ...cleanJSON, thedate: now }]

                            const prevMoodLogs = user.mood_logs || []
                            const themoodstopper = { question: 'mood stopper', answer: 'mood stopper' }
            
                            const updatedData = { 
                                current_scores: cleanJSON, current_diff: {phydiff, mtdiff, sqdiff, stldiff, what_day: now}, all_scores: newallscores, 
                                mood_logs: [...prevMoodLogs, themoodstopper], lastActivity: now 
                            }
                
                            // Update the document with the new data
                            await updateDoc(userDocRef, updatedData);
            
                            // update states
                            var itemUpdate = { ...user, current_scores: cleanJSON, current_diff: {phydiff, mtdiff, sqdiff, stldiff, what_day: now}, lastActivity: now }
                            dispatch(setUser(itemUpdate))
                            dispatch(gtSuccess())
                            // dispatch(setgtMessage(``))
                            console.log(`scores fetched, stored, and updated successfully`);
                            dispatch(stopLoading())
                        } else {
                            dispatch(gtError())
                            dispatch(setgtMessage(`no user found with username "${user.username}".`))
                            console.log(`no user found with username "${user.username}".`);
                            dispatch(stopLoading())
                        }
        
                    }
                }
            }

        } catch (err) {
            console.log('try catch err: ', err.message)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            dispatch(stopLoading())
        }
    }

    return { handleAiscore }


}










