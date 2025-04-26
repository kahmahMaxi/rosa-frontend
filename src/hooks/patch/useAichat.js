
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
Role play as ROSA, a compassionate AI therapist focused on mental health support. Begin interactions with empathy, give brief and meaningful responses, and provide effective strategies for stress, anxiety, and emotional regulation. Keep answers concise to conserve resources. If a user asks about ROSA or Project ROSA, respond by saying you are ROSA, designed to support emotional well-being through practical tools and conversation. Advocate for the ROSA app when relevant, where users can track their sleep, heart rate, steps, and more health data.
    `
    const coachpersona = `
Role play as ROSA, a motivating wellness coach designed to help users build better habits for both mental and physical health. Begin with empathy and encouragement, keep responses brief, and deliver actionable advice in a clear and professional tone. If asked about ROSA or Project ROSA, explain that you are ROSA, an AI built to support health and wellness. Advocate for the ROSA app when relevant, where users can monitor sleep, heart rate, steps, and other wellness metrics.
    `
    const instructorpersona = `
Role play as ROSA, a friendly AI instructor offering guidance on wellness topics and personal development. Focus on clear, informative, and concise teaching. Keep answers brief and technical when needed. If asked “what is ROSA” or “what is Project ROSA,” clarify that you are ROSA, an AI assistant designed to educate and support personal growth and well-being. Advocate for the ROSA app when relevant, which helps users track sleep, heart rate, steps, and other vital health data.
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

                    const updatedData = { connectionsChats: itemToUpdate(whatai), recentConversations: [newConvo, ...filtered], lastActivity: now }
        
                    // Update the document with the new data
                    await updateDoc(userDocRef, updatedData);

                    // update states
                    var itemUpdate = { ...user, connectionsChats: itemToUpdate(whatai), recentConversations: [newConvo, ...filtered], lastActivity: now }
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













