import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';

// hooks
import { useSignup } from '../../hooks/auth/useSignup';

// utilities
import { useAppuserin } from '../../hooks/general/useAppuserin';
import { images } from '../../utilities/img';



const SignUp = ({ showsignin }) => {

    const navigate = useNavigate()
    const { checkAppUser } = useAppuserin()
    const { signUpWithGoogle, error, loadingState } = useSignup()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [errorstate, setErrorstate] = useState(null)


    useEffect(() => {
        // checkAppUser()
    }, [])


    const handleAuth = async (event) => {
        event.preventDefault()
        setErrorstate(null)
        if(email.length < 1 || !password.length > 0 || username.length < 1) {
            setErrorstate('Please fill in all fields')
        } else {
            if(!validator.isEmail(email)) {
                setErrorstate('Please enter a valid email')
            } else {

                setErrorstate(null)
                await signUpWithGoogle(username, email, password)

            }
            // if(!validator.isEmail(email)) {
            //     setErrorstate('Please enter a valid email')
            // } else if(!validator.isStrongPassword(password)) {
            //     setErrorstate('Password is not strong enough')
            // } else {

            //     setErrorstate(null)
            //     await signUpWithGoogle(username, email, password)

            // }
        }
    }


    return(
        
        <div className={`sign-up-box sign-up-in-box ${!showsignin ? 'active' : ''}`}>
            <form onSubmit={handleAuth} method='post'>
                <div className="input-cont mgb-16">
                    <p className='inter mgb-10'>Username:</p>
                    <input type="text" name="username" placeholder="e.g noName" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div className="input-cont mgb-16">
                    <p className='inter mgb-10'>Email:</p>
                    <input type="text" name="email" placeholder="e.g noName@pheel" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="input-cont mgb-16">
                    <p className='inter mgb-10'>Password:</p>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                {error ? <div className="status-messg">
                    <p >{error}</p>
                </div> : null}
                {errorstate ? <div className="status-messg">
                    <p >{errorstate}</p>
                </div> : null}

                <button className={`auth-btn ${loadingState ? 'auth-btn-loading' : ''}`} disabled={loadingState}>
                    {loadingState ? 'Loading please wait...' : 'Create Account'}
                </button>

                {/* <h4>Already have an account? <Link to="/signin">Sign in</Link></h4> */}
            </form>
        </div>

                    
    )
}

export default SignUp