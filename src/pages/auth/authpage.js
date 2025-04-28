import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';

// hooks
import { useSignup } from '../../hooks/auth/useSignup';

// utilities
import { useAppuserin } from '../../hooks/general/useAppuserin';
import { images } from '../../utilities/img';
import SignUp from './signup';
import SignIn from './signin';



const AuthPage = () => {

    const navigate = useNavigate()
    const { checkAppUser } = useAppuserin()
    const { signUpWithGoogle, error, loadingState } = useSignup()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [errorstate, setErrorstate] = useState(null)

    const [showsignin, setshowsignin] = useState(null)


    useEffect(() => {
        checkAppUser()
    }, [])


    const handleAuth = async (event) => {
        event.preventDefault()
        setErrorstate(null)
        if(email.length < 1 || !password.length > 0 || username.length < 1) {
            setErrorstate('Please fill in all fields')
        } else {
            if(!validator.isEmail(email)) {
                setErrorstate('Please enter a valid email')
            } else if(!validator.isStrongPassword(password)) {
                setErrorstate('Password is not strong enough')
            } else {

                setErrorstate(null)
                await signUpWithGoogle(username, email, password)

            }
        }
    }


    return(
        <div className="auth-container">
            <div className="auth-box">
                <div className="container-100">

                    <div className="auth-title mgb-16">
                        <div className="flex row align-center gap-10">
                            <img src={images.general.rs_logo_single_nb} alt="" />
                            <div className="">
                                <h2 className="">ROSA</h2>
                                <h3 className='inter'>Mental Wellness Assistant</h3>
                            </div>
                        </div>
                    </div>

                    <div className="auth-nav-box grid grid-column-2 row mgb-24">
                        <div className={`auth-nav-item flex justify-center align-center cursor-pointer ${!showsignin ? 'active' : ''}`} onClick={() => setshowsignin(null)}>
                            <p className='inter'>Sign Up</p>
                        </div>
                        <div className={`auth-nav-item flex justify-center align-center cursor-pointer ${showsignin ? 'active' : ''}`} onClick={() => setshowsignin(true)}>
                            <p className='inter'>Sign In</p>
                        </div>
                    </div>

                    <div className="form-row">
                        <SignUp showsignin={showsignin} />
                        <SignIn showsignin={showsignin} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthPage