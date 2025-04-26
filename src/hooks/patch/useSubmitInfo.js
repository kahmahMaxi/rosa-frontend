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






export const useSubmitinfo = () => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()


    const submitInfo = async (username, height, weight, bloodgroup, age) => {
        try {
            dispatch(startLoading())
            console.log(username)
            const now = new Date().getTime()
            
            // query user docs to update
            const userquery = query(collection(db, "usersdetails"), where("username", "==", username))
            // execute the query
            const userquerySnapshot = await getDocs(userquery);

            if (!userquerySnapshot.empty) {
                // get the first matching document (assuming usernames are unique)
                const userDoc = userquerySnapshot.docs[0];
                const userDocRef = doc(db, "usersdetails", userDoc.id);

                const updatedData = { physical_info: { height, weight, bloodgroup, age }, lastActivity: now }
    
                // Update the document with the new data
                await updateDoc(userDocRef, updatedData);

                // update states
                var itemUpdate = { ...user, physical_info: { height, weight, bloodgroup, age }, lastActivity: now }
                dispatch(setUser(itemUpdate))
                dispatch(gtSuccess())
                dispatch(setgtMessage(`info updated successfully.`))
                console.log(`physical_info updated`);
                dispatch(stopLoading())
            } else {
                dispatch(gtError())
                dispatch(setgtMessage(`no user found with username "${username}".`))
                console.log(`no user found with username "${username}".`);
                dispatch(stopLoading())
            }

        } catch (err) {
            console.log('try catch err: ', err.message)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            dispatch(stopLoading())
        }
    }



    return { submitInfo }
}



