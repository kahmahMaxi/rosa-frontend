import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import validator from 'validator';

// hooks
import { useSignin } from '../../hooks/auth/useSignin';

// utilities
import { useAppuserin } from '../../hooks/general/useAppuserin';
import { images } from './../../utilities/img'

const SignIn = ({ showsignin }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { checkAppUser } = useAppuserin()
    const { signInWithGoogle, error, loadingState } = useSignin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorstate, setErrorstate] = useState(null)    

    useEffect(() => {
        // checkAppUser()
    }, [])


    // handle sign in auth
    const handleAuth = async (event) => {
        event.preventDefault()
        setErrorstate(null)
        if(email.length < 1 || password.length < 1) {
            setErrorstate('Please fill in all fields')
        } else {
            if(!validator.isEmail(email)) {
                setErrorstate('Please enter a valid email')
            } else {

                setErrorstate(null)
                await signInWithGoogle(email, password)

            }
        }
    }

    return (

        <div className={`sign-in-box sign-up-in-box ${showsignin ? 'active' : ''}`}>
            <form onSubmit={handleAuth} method='post'>
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
                    {loadingState ? 'Loading please wait...' : 'Sign In'}
                </button>

                {/* <h4>Don't have an account yet? <Link to="/signup">Sign up</Link></h4> */}
            </form>
        </div>
        
        
    )
}

export default SignIn;