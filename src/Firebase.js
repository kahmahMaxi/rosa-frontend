import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
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
} from "firebase/firestore";


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
const db = getFirestore(app)
const googleprovider = new GoogleAuthProvider()


const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleprovider)
        const user = response.user
        const qry = query(collection(db, "users"), where("uid", "==",user.uid))
        const docs = await getDocs(qry)
        if(docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            })
        }
    } catch (err) {
        console.log(err.message)
    }
}

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.log(err.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: 'locally',
            email
        })
    } catch (err) {
        console.log(err.message)
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert('please check your email. password reset link is sent')
    } catch (err) {
        console.log(err.message)
    }
}

const logOut = () => {
    signOut(auth)
}


export {
    auth, db,
    signInWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logOut
}










