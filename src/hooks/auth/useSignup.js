import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    signInWithCredential,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";


//
import { db } from '../../Firebase'

// states
import { setUser } from './../../redux/userSlice';
import { setgtMessage } from './../../redux/gtmsgSlice';
import { gtSuccess, gtError, setgtNull } from './../../redux/gtstatusSlice';


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


export const useSignup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const [loadingState, setLoadingState] = useState(false)


    const signUpWithGoogle = async (username, email, password) => {
        try {
            setError(null)
            setLoadingState(true)

            
            // reference to the users collection
            const usersCollection = collection(db, "usersdetails");

            // query to find if a user exists with the given useremail
            const userQuery = query(usersCollection, where("useremail", "==", email));

            // query to find if username exists
            const userNameQuery = query(usersCollection, where("username", "==", username));

            // execute the query
            const querySnapshot = await getDocs(userQuery);
            const nameQuerySnapshot = await getDocs(userNameQuery);

            // check if a document with the username exists
            if (querySnapshot.empty) {
                // if no document exists, check if username exists before creating a new(user) one
                if (nameQuerySnapshot.empty) {
                    // username does not exists so create new (user) doc
                    const response = await createUserWithEmailAndPassword(auth, email, password)
                    const user = response.user
    
                    console.log(user.email, username);

                    const notisItem = [ {title: 'Welcome to Neurosa 🌐🧠', body: `hey ${username}, you’ve just joined a movement at the frontier of wellness and web3. Connect your wallet, explore decentralized features, and be part of a future where tech meets self-care. Let’s shape the next era—together.`} ]
    
                    const newUser = {
                        username: username,
                        useremail: user.email,
                        notis: notisItem,
                        chatno: 5,
                        createdAt: new Date().getTime(), // timestamp for when the user is created
                        lastActivity: new Date().getTime(), 
                    };
    
                    const docRef = await addDoc(usersCollection, newUser);
                    const createdUser = { userid: docRef.id, ...newUser }
    
                    // update states
                    dispatch(setUser(createdUser))
                    localStorage.setItem('rosatechuser', JSON.stringify({username, useremail: email}))
                    console.log(`user with username "${username}" has been created.`);
                    dispatch(gtSuccess())
                    dispatch(setgtMessage('signup success'))
                    setLoadingState(false)
                    navigate('/dashboard')
                    
                } else {
                    // username already exixts
                    setLoadingState(false)
                    setError('username already exists')
                    console.log('username exists')
                }
            } else {

                // if user exists then login instead
                console.log('user exists, login')
                dispatch(gtError())
                dispatch(setgtMessage('user exists, login instead'))
                setLoadingState(false)
            }
    
        } catch (err) {
            console.log('try catch error: ', err.message)
            setError(`an error occured while processing your request: ${err.message}`)
            // setTimeout(() => { setError(null) }, 3000)
            setLoadingState(false)
        }
    }


    return { signUpWithGoogle, loadingState, error } 
}