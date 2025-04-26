import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";


//
import { db } from './../../Firebase'

// states_g
import { setUser } from './../../redux/userSlice';
import { setgtMessage } from './../../redux/gtmsgSlice';
import { gtSuccess } from './../../redux/gtstatusSlice';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleprovider = new GoogleAuthProvider()


export const useSignin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const [loadingState, setLoadingState] = useState(false)

    

    const signInWithGoogle = async (email, password) => {
        try {
            setError(null)
            setLoadingState(true)

            
            // reference to the users collection
            const usersCollection = collection(db, "usersdetails");

            // query to find if a user exists with the given useremail
            const userQuery = query(usersCollection, where("useremail", "==", email));

            // execute the query
            const querySnapshot = await getDocs(userQuery);

            // check if a document with the username exists
            if (!querySnapshot.empty) {
                // if the user exists then login 
                const response = await signInWithEmailAndPassword(auth, email, password)
                
                const existingUserDoc = querySnapshot.docs[0];
                const existingUser = { userid: existingUserDoc.id, ...existingUserDoc.data() };

                console.log(existingUser);

                // update states
                dispatch(setUser(existingUser))
                localStorage.setItem('rosatechuser', JSON.stringify({username: existingUser.username, useremail: existingUser.useremail}))
                console.log(`user with username "${existingUser.username}" has been logged in.`);
                dispatch(gtSuccess())
                dispatch(setgtMessage('login success'))
                setLoadingState(false)
                navigate('/')
            } else {
                // if no document exists, notify user
                console.log(`user with email ${email} does not exixts`)
                setError(`user with email ${email} does not exixts`) 
                setLoadingState(false)
            }
    
        } catch (err) {
            console.log('try catch error: ', err.message)
            setError(`an error occured while processing your request: ${err.message}`)
            // setTimeout(() => { setError(null) }, 5000)
            setLoadingState(false)
        }
    }


    return { signInWithGoogle, loadingState, error } 
}