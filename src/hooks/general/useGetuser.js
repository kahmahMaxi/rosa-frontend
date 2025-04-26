import { useState } from "react";
import { useDispatch } from "react-redux";

import { 
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getDoc,
    onSnapshot,
    setDoc,
    doc,
    orderBy,
    serverTimestamp,
    limit,
    deleteDoc,
    updateDoc      
} from "firebase/firestore";

//
import { db } from '../../Firebase'

// states
import { setUser } from './../../redux/userSlice';
import { setgtMessage } from './../../redux/gtmsgSlice';
import { gtError, setgtNull } from './../../redux/gtstatusSlice';
import { startLoading, stopLoading } from './../../redux/loadingSlice';






export const useGetuser = () => {

    const dispatch = useDispatch()


    const getUser = async (username) => {
        try {
            dispatch(startLoading())
            console.log(username)
            // create a query to match the username
            const userQuery = query(
                collection(db, "usersdetails"),
                where("username", "==", username)
            );
    
            // set up the real-time listener
            const unsubscribe = onSnapshot(userQuery, (snapshot) => {
                if (!snapshot.empty) {
                    // if a user document exists, get the first matching document
                    const userData = snapshot.docs[0].data();
                    console.log(userData)
                    dispatch(setUser({ userid: snapshot.docs[0].id, ...userData }))
                    dispatch(stopLoading())
                } else {
                    // no matching user document found
                    console.log('no user found')
                    dispatch(stopLoading())
                }
            });
    
            // Cleanup the listener on unmount
            return () => unsubscribe();
        } catch (err) {
            console.log('try catch err: ', err.message)
            dispatch(gtError())
            dispatch(setgtMessage(`${err.message}, try to refresh the page`))
            dispatch(stopLoading())
        }
    }



    return { getUser }
}



