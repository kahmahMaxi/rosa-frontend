
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
import { setUser } from './../../redux/userSlice';
import { setgtMessage } from './../../redux/gtmsgSlice';
import { gtSuccess, gtError, setgtNull } from './../../redux/gtstatusSlice';
import { startLoading, stopLoading } from './../../redux/loadingSlice';
import { closeosModal } from './../../redux/osSlice';






export const useSubmitschedule = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()


    const submitSchedule = async (scheduleItem) => {
        try {
            if(user) {
                dispatch(startLoading())
                console.log(user.username)
                const now = new Date().getTime()
                
                // query user docs to update
                const userquery = query(collection(db, "usersdetails"), where("username", "==", user.username))
                // execute the query
                const userquerySnapshot = await getDocs(userquery);
    
                if (!userquerySnapshot.empty) {
                    // get the first matching document (assuming usernames are unique)
                    const userDoc = userquerySnapshot.docs[0];
                    const userDocRef = doc(db, "usersdetails", userDoc.id);
                    const prevSchedules = user.schedules || []
    
                    const updatedData = { schedules: [ ...prevSchedules, scheduleItem ], lastActivity: now }
        
                    // Update the document with the new data
                    await updateDoc(userDocRef, updatedData);
    
                    // update states
                    var itemUpdate = { ...user, schedules: [ ...prevSchedules, scheduleItem ], lastActivity: now }
                    dispatch(setUser(itemUpdate))
                    dispatch(gtSuccess())
                    dispatch(setgtMessage(`schedule added successfully.`))
                    console.log(`schedule added`);
                    dispatch(stopLoading())
                    dispatch(closeosModal())
                } else {
                    dispatch(gtError())
                    dispatch(setgtMessage(`no user found with username "${user.username}".`))
                    console.log(`no user found with username "${user.username}".`);
                    dispatch(stopLoading())
                }
            } else {
                dispatch(gtError())
                dispatch(setgtMessage(`user is null, refresh or login again.`))
                console.log(`user state is null`);
            }

        } catch (err) {
            console.log('try catch err: ', err.message)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            dispatch(stopLoading())
        }
    }



    return { submitSchedule  }
}








