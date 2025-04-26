import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { useSubmitschedule } from "../hooks/patch/useSubmitschedule"
import { icons } from "../utilities/icn"

// states_g
import { closeosModal } from "../redux/osSlice"




const OpenSchedule = ({ showSchedule }) => {

    const dispatch = useDispatch()

    const { submitSchedule } = useSubmitschedule()

    const [eventname, seteventname] = useState(null)
    const [eventnameselect, seteventnameselect] = useState(null)
    const [selecteddate, setselecteddate] = useState('')
    const [errorstate, setErrorstate] = useState(null)

    const eventNames = [
        'AI Therapy Session',
        'AI Wellness Coaching',
        'AI Post Workout Sessions',
        'Community Meeting',
    ]

    const handleEventselect = () => {
        if(eventnameselect) {
            seteventnameselect(null)
        } else {
            seteventnameselect(true)
        }
    }

    const handleSubmitSchedule = async () => {
        setErrorstate(null)
        if(!eventname || !selecteddate) {
            setErrorstate('please fill in all fields')
        } else {

            const numberDate = new Date(selecteddate).getTime()
            const scheduleItem = { name: eventname, date: numberDate }
            console.log(scheduleItem)

            await submitSchedule(scheduleItem)

        }
    }



    return (

        <div className={`open-schedule ${showSchedule ? 'active' : ''}`}>

            <div className="open-schedule-inner">

                <div className="flex justify-space-between align-center mgb-16">
                    <h2 className="inter">Add a Schedule</h2>

                    <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(closeosModal())}>
                        <img src={icons.header.close} alt="" />
                    </div>
                </div>

                <h3 className="inter mgb-10">Select the event type</h3>

                <div className="grid grid-column-1 gap-8 mgb-24">
                    {eventNames.map(item => (
                        <div className={`event-select-item cursor-pointer ${eventname === item ? 'active' : ''}`} key={item} onClick={() => seteventname(item)}>
                            <h4 className="inter">{item}</h4>
                        </div>
                    ))}
                </div>

                <h3 className="inter mgb-10">Select the date</h3>

                <input
                    type="datetime-local"
                    value={selecteddate}
                    onChange={(e) => setselecteddate(e.target.value)}
                    className="event-select-date inter mgb-24"
                />

                {errorstate ? <div className="status-messg os">
                    <p >{errorstate}</p>
                </div> : null}

                <button className="auth-btn os-btn"
                    onClick={handleSubmitSchedule}
                >
                    Add
                </button>


            </div>

        </div>

    )

}


export default OpenSchedule





