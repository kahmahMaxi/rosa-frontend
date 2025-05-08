
import { useState } from "react";
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




export const useAichat = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(null)

    const fetchAIReply = async (aiMessage) => {
        // actual api call to ai
        const requestBody = {
            model: "gpt-4o",
            messages: aiMessage,
            temperature: 0.7,
            max_tokens: 150,
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

    const therapypersona = `
Role play as ROSA, a compassionate AI therapist focused on emotional and mental well-being. Begin interactions with empathy, offer brief and meaningful responses, and provide practical strategies for managing stress, anxiety, and emotional regulation. Keep answers concise to conserve resources.

If asked about ROSA or Project ROSA, explain that you are ROSA, designed to support emotional wellness through conversation and mental health tools.

You are one of three AI assistants in the ROSA system. Alex is the wellness coach, and Raf is the instructor. You each specialize in different areas but work together to support the user’s full well-being.

Advocate for the ROSA app when relevant — where users can track sleep, heart rate, steps, and other health data to improve their overall balance.
    `
    const coachpersona = `
Role play as Alex, a motivating wellness coach designed to help users build better physical and mental health habits. Begin with empathy and encouragement. Keep responses brief and focused on clear, actionable advice.

If asked “Who is Alex?” or “What is Project ROSA?”, explain that you are Alex, part of the ROSA AI system, focused on fitness, motivation, and daily habit formation.

You work alongside Raf, the educational instructor, and ROSA, the emotional wellness therapist. Together, you support users in different aspects of their health journey.

Recommend the ROSA app when it’s helpful — it tracks sleep, heart rate, steps, and more to support whole-body wellness.
    `
    const instructorpersona = `
Role play as Raf, a friendly AI instructor offering guidance on wellness topics and personal development. Deliver concise, informative teaching. Be clear and brief, especially when explaining technical or educational content.

If asked “Who is Raf?” or “What is Project ROSA?”, explain that you are Raf, an AI built to educate and empower users as part of the ROSA system.

You work with Alex, the motivating wellness coach, and ROSA, the mental health therapist. Each of you brings a unique approach to supporting the user’s well-being.

When appropriate, mention the ROSA app — it tracks sleep, heart rate, steps, and other vital data to help users stay balanced and informed.
    `

    const getShortname = (type) => {
        switch (type) {
            case 'AI Therapist':
                return 'therapist';
            case 'AI Wellness Coach':
                return 'coach';
            case 'AI Instructor':
                return 'instructor';
            default:
                return 'therapist';
        }
    }

    const getRecentPrevMessages = (theuser, type) => {
        switch (type) {
            case 'AI Therapist':
                return theuser.connectionsChats?.therapy.slice(-10) || [];
            case 'AI Wellness Coach':
                return theuser.connectionsChats?.coach.slice(-10) || [];
            case 'AI Instructor':
                return theuser.connectionsChats?.instructor.slice(-10) || [];
            default:
                return theuser.connectionsChats?.therapy.slice(-10) || [];
        }
    }

    const handleAireply = async (whatai, usermessage) => {
        try {
            if(user) {
                setLoading(true)
                const now = new Date().getTime()

                // prepare ai messages
                const prevRecentMessages = getRecentPrevMessages(user, whatai)
                const newMessage = { role: 'user', content: usermessage }
                // console.log(prevRecentMessages)


                const getSystemPrompt = (type) => {
                    switch (type) {
                        case 'AI Therapist':
                        return { role: 'system', content: therapypersona };
                        case 'AI Wellness Coach':
                        return { role: 'system', content: coachpersona };
                        case 'AI Instructor':
                        return { role: 'system', content: instructorpersona };
                        default:
                        return { role: 'system', content: therapypersona };
                    }
                };

                const messageToSend = [getSystemPrompt(whatai), ...prevRecentMessages, newMessage]
                // console.log(messageToSend)
                const airesponse = await fetchAIReply(messageToSend)
                console.log(airesponse)

                // query user docs to update
                const userquery = query(collection(db, "usersdetails"), where("username", "==", user.username))
                // execute the query
                const userquerySnapshot = await getDocs(userquery);

                if (!userquerySnapshot.empty) {
                    // get the first matching document (assuming usernames are unique)
                    const userDoc = userquerySnapshot.docs[0];
                    const userDocRef = doc(db, "usersdetails", userDoc.id);

                    // const prevChats = user.connectionsChats || []
                    const newChat = [
                        { role: 'user', content: usermessage },
                        { role: 'assistant', content: airesponse },
                    ]
                    const prevtherapy = user.connectionsChats?.therapy || []
                    const prevcoach = user.connectionsChats?.coach || []
                    const previnstructor = user.connectionsChats?.instructor || []

                    const itemToUpdate = (type) => {
                        switch (type) {
                            case 'AI Therapist':
                                const therapyupdate = { therapy: [...prevtherapy, ...newChat], coach: prevcoach, instructor: previnstructor }
                                return therapyupdate;
                            case 'AI Wellness Coach':
                                const coachupdate = { coach: [...prevcoach, ...newChat], therapy: prevtherapy, instructor: previnstructor }
                                return coachupdate;
                            case 'AI Instructor':
                                const instructorupdate = { instructor: [...previnstructor, ...newChat], therapy: prevtherapy, coach: prevcoach }
                                return instructorupdate;
                            default:
                                const defaultupdate = { therapy: [...prevtherapy, ...newChat], coach: prevcoach, instructor: previnstructor }
                                return defaultupdate;
                        }
                    }

                    const prevRecentConvo = user.recentConversations ? user.recentConversations : []
                    const filtered = prevRecentConvo.filter(item => item.name !== whatai)
                    const newConvo = { name: whatai, shortname: getShortname(whatai), date: now }

                    const prevchatno = user.chatno || 0
                    const newchatno = prevchatno - 1

                    const updatedData = { connectionsChats: itemToUpdate(whatai), recentConversations: [newConvo, ...filtered], chatno: newchatno, lastActivity: now }
        
                    // Update the document with the new data
                    await updateDoc(userDocRef, updatedData);

                    // update states
                    var itemUpdate = { ...user, connectionsChats: itemToUpdate(whatai), recentConversations: [newConvo, ...filtered], chatno: newchatno, lastActivity: now }
                    dispatch(setUser(itemUpdate))
                    // dispatch(gtSuccess())
                    // dispatch(setgtMessage(``))
                    console.log(`chat and reply sent fetched, stored, and updated successfully`);
                    setLoading(null)
                } else {
                    dispatch(gtError())
                    dispatch(setgtMessage(`no user found with username "${user.username}".`))
                    console.log(`no user found with username "${user.username}".`);
                    setLoading(null)
                }
        
                    
            }

        } catch (err) {
            console.log('try catch err: ', err.message)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            setLoading(null)
        }
    }

    return { handleAireply, loading }


}













