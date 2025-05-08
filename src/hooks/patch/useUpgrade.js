
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
import { gtSuccess, gtError, setgtNull, gtNeutral } from './../../redux/gtstatusSlice';
import { startLoading, stopLoading } from './../../redux/loadingSlice';
import { closeosModal } from './../../redux/osSlice';






export const useUpgrade = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()


    const upgradeUser = async () => {
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
                    const prevchatno = user.chatno || 0
                    const newchatno = prevchatno + 10
                    const prevnotis = user.notis || []
                    const newnotis = { title: '🎉 Premium Unlocked!', body: "You've just leveled up! Enjoy exclusive features, faster performance, and all the alpha as a ROSA Premium user. Welcome to the inner circle 🌟" }
    
                    const updatedData = { upgraded: true, notis: !user.upgraded ? [ ...prevnotis, newnotis ] : [...prevnotis], chatno: newchatno, lastActivity: now }
        
                    // Update the document with the new data
                    await updateDoc(userDocRef, updatedData);
    
                    // update states
                    var itemUpdate = { ...user, upgraded: true, notis: [ ...prevnotis, newnotis ], chatno: newchatno, lastActivity: now }
                    dispatch(setUser(itemUpdate))
                    dispatch(gtNeutral())
                    dispatch(setgtMessage(`🎉 Premium Unlocked!`))
                    console.log(`upgrade success`);
                    dispatch(stopLoading())
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



    return { upgradeUser  }
}








