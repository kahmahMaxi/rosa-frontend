import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import { setgtMessage } from "../redux/gtmsgSlice";
import { gtError } from "../redux/gtstatusSlice";


import { useSubmitinfo } from "../hooks/patch/useSubmitInfo";




const UpdateInfo = ({showinfo}) => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()

    const { submitInfo } = useSubmitinfo()

    const [age, setAge] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    // const [location, setLocation] = useState('')
    const [errorstate, setErrorstate] = useState(null)

    const handleSubmitInfo = async (event) => {
        event.preventDefault()
        setErrorstate(null)
        if(bloodgroup.length < 1 || height.length < 1 || weight.length < 1 || age.length < 1 ) {
            setErrorstate('Please fill in all fields')
        } else {
            
            setErrorstate(null)
            console.log(bloodgroup, height, weight)
            if(user) {

                await submitInfo(user.username, height, weight, bloodgroup, age)

            } else {
                dispatch(gtError())
                dispatch(setgtMessage('user state is null, refresh the page'))
            }
            // var storeditem = localStorage.getItem('rosatechuser')
            // if(!storeditem) {
            //     navigate('/signin')
            // } else {
            //     // check if user is null then make request to the db to get details
            //     if(!user) {
            //         console.log('user state is null')
            //         var parsed = JSON.parse(storeditem)
            //         await getUser(parsed.username)
            //     }
            // }

        }
    }


    return (

        <div className={`update-info-container ${showinfo ? 'uic-active' : ''}`}>

            <div className="uic-inner">

                <div className="uic-title mgb-24">
                    <h2 className="inter">Physical Info</h2>
                    <h3 className="inter">Your physical info</h3>
                </div>

                {/* <div className="form-row"> */}
                    <form onSubmit={handleSubmitInfo}>
                        {/* <div className="input-cont">
                            <p>Location:</p>
                            <input type="text" name="location" placeholder="Germany, Berlin" value={location} onChange={(e)=>setLocation(e.target.value)} />
                        </div> */}
                        <div className="input-cont mgb-16">
                            <p className="inter mgb-10">Age:</p>
                            <input type="number" name="age" placeholder="18" value={age} onChange={(e)=>setAge(e.target.value)} />
                        </div>
                        <div className="input-cont mgb-16">
                            <p className="inter mgb-10">Blood Group:</p>
                            <input type="text" name="bloodgroup" placeholder="o+" value={bloodgroup} onChange={(e)=>setBloodGroup(e.target.value)} />
                        </div>
                        <div className="input-cont mgb-16">
                            <p className="inter mgb-10">Height(cm):</p>
                            <input type="number" name="height" placeholder="180cm" value={height} onChange={(e)=>setHeight(e.target.value)} />
                        </div>
                        <div className="input-cont mgb-16">
                            <p className="inter mgb-10">Weight(kg):</p>
                            <input type="number" name="weight" placeholder="90kg" value={weight} onChange={(e)=>setWeight(e.target.value)} />
                        </div>

                        {/* {error ? <div className="status-messg">
                            <p >{error}</p>
                        </div> : null} */}
                        {errorstate ? <div className="status-messg">
                            <p >{errorstate}</p>
                        </div> : null}

                        <button className="auth-btn">
                            Submit
                        </button>
                    </form>
                {/* </div> */}

            </div>

        </div>
    )

}


export default UpdateInfo;
