import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import { setgtMessage } from "../redux/gtmsgSlice";
import { gtError } from "../redux/gtstatusSlice";




const CheckinBox = ({showcheckin}) => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()

    const [options, setOptions] = useState({ 
        mood: null, sleep: null, energylevel: null, stress: null, focus: null, trigger: null, sit: null, activity: null, 
    })
    const [ optionvalues, setOptionvalues ] = useState({
        mood: null, sleep: null, energylevel: null, stress: null, focus: null, trigger: null, sit: null, activity: null,
    })
    const [errorstate, setErrorstate] = useState(null)

    const moodOptions = [ 'Happy 😊', 'Sad 😔', 'Anxious 😰', 'Hopeful 🌈', 'Angry 😠' ]
    const energyOptions = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]
    const sleepOptions = [ 'great', 'okay', 'poor' ]
    const stressOptions = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]
    const focusOptions = [ '10%', '30%', '50%', '70%', '100%' ]
    const triggerOptions = [ 'positive', 'negative' ]
    const sitOptions = [ 'no', 'yes', 'not sure' ]
    const activityOptions = [ 'no', 'yes', ]
    
    const handleSubmitCheckin = async (event) => {
        
    }


    return (

        <div className={`checkin-container ${showcheckin ? 'checkin-active' : ''}`}>

            <div className="checkin-inner">

                <div className="uic-title">
                    <h2>Daily Check-in</h2>
                    <h3>let us know how you're doing today</h3>
                </div>

                <div className="form-row position-relative">
                    <form onSubmit={handleSubmitCheckin}>


                        <div className="grid grid-column-2 row gap-15">

                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>How are you feeling today?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.mood ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.mood) {
                                                setOptions({mood: null})
                                            } else {
                                                setOptions({mood: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.mood ? optionvalues.mood : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box ${options.mood ? 'active' : ''}`}>
                                    {moodOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ mood: null })
                                                setOptionvalues((prevState) => ({ ...prevState, mood: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>How energized do you feel?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.energylevel ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.energylevel) {
                                                setOptions({energylevel: null})
                                            } else {
                                                setOptions({energylevel: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.energylevel ? optionvalues.energylevel : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box right ${options.energylevel ? 'active' : ''}`}>
                                    {energyOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ energylevel: null })
                                                setOptionvalues((prevState) => ({...prevState, energylevel: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>
                            
                        
                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>How did you sleep last night?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.sleep ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.sleep) {
                                                setOptions({sleep: null})
                                            } else {
                                                setOptions({sleep: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.sleep ? optionvalues.sleep : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box sleep ${options.sleep ? 'active' : ''}`}>
                                    {sleepOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ sleep: null })
                                                setOptionvalues((prevState) => ({ ...prevState, sleep: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>Did you move or meditate today?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.activity ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.activity) {
                                                setOptions({activity: null})
                                            } else {
                                                setOptions({activity: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.activity ? optionvalues.activity : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box activity right ${options.activity ? 'active' : ''}`}>
                                    {activityOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ activity: null })
                                                setOptionvalues((prevState) => ({...prevState, activity: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>


                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>How stressed do you feel right now?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.stress ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.stress) {
                                                setOptions({stress: null})
                                            } else {
                                                setOptions({stress: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.stress ? optionvalues.stress : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box stress ${options.stress ? 'active' : ''}`}>
                                    {stressOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ stress: null })
                                                setOptionvalues((prevState) => ({...prevState, stress: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>How focused or clear-minded are you today?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.focus ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.focus) {
                                                setOptions({focus: null})
                                            } else {
                                                setOptions({focus: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.focus ? optionvalues.focus : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box focus right ${options.focus ? 'active' : ''}`}>
                                    {focusOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ focus: null })
                                                setOptionvalues((prevState) => ({ ...prevState, focus: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>Was there something that stood out today?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.trigger ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.trigger) {
                                                setOptions({trigger: null})
                                            } else {
                                                setOptions({trigger: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.trigger ? optionvalues.trigger : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box trigger ${options.trigger ? 'active' : ''}`}>
                                    {triggerOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ trigger: null })
                                                setOptionvalues((prevState) => ({...prevState, trigger: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>


                            <div className="input-relative">
                                <div className="select-input-cont">
                                    <p>Did you have meaningful interactions today?</p>
                                    <div className={`select-box cursor-pointer ${optionvalues.sit ? 'selected' : ''}`} 
                                        onClick={() => {
                                            if(options.sit) {
                                                setOptions({sit: null})
                                            } else {
                                                setOptions({sit: true})
                                            }
                                        }}
                                    >
                                        <h3>{optionvalues.sit ? optionvalues.sit : 'Select'}</h3>
                                    </div>
                                </div>
                                <div className={`select-down-box sit right ${options.sit ? 'active' : ''}`}>
                                    {sitOptions.map((option, index) => (
                                        <h5 className="cursor-pointer" key={index}
                                            onClick={() => {
                                                setOptions({ sit: null })
                                                setOptionvalues((prevState) => ({ ...prevState, sit: option }))
                                            }}
                                        >
                                            {option}
                                        </h5>
                                    ))}
                                </div>
                            </div>

                            
                            
                        
                        </div>

                        

                        {/* {error ? <div className="status-messg">
                            <p >{error}</p>
                        </div> : null} */}
                        {errorstate ? <div className="status-messg">
                            <p >{errorstate}</p>
                        </div> : null}

                        <button className="auth-btn">
                            Check In
                        </button>
                    </form>
                </div>

            </div>

        </div>
    )

}


export default CheckinBox;
