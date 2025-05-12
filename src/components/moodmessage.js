
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { icons } from "../utilities/icn";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";
import { openModal } from "../redux/moodmodalSlice";
import { images } from "../utilities/img";




const MoodMessage = ({ width }) => {

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()
    

    const setAlltoNull = () => {
        
    }


    return (

        <div className={`notis-cont ${modalgeneral === 'moodmessage' ? 'active' : ''}`}>

            <div className={`notis-inner moodmessage-inner`}>

                <div className="flex justify-space-between align-center mgb-16">
                    <h2 className="inter">Message</h2>

                    <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(setmodalgeneral(null))}>
                        <img src={icons.header.close} alt="" />
                    </div>
                </div>

                <div className="grid grid-column-1 gap-30">
                    
                    <div className="notis-item">
                        {/* <img src={images.connect.rs1} alt="" /> */}
                        <div className="">
                            <h3 className="inter mgb-10">🧠 Get the Full Picture</h3>
                            <h4 className="inter">
                                To unlock your complete wellness insights, ROSA needs at least 4 mood check-ins. The more you share, the better ROSA understands how you're really feeling.
                            </h4>
                        </div>
                    </div>

                    <div className={`grid ${width < 500 ? 'gridn-column-1' : 'grid-column-2'} row gap-20`}>
                        <div className="flex justify-center moodmessage-btn cursor-pointer" 
                            onClick={() => {
                                dispatch(openModal())
                                dispatch(setmodalgeneral(null))
                            }}
                        >
                            {/* <p className="inter">Add Mood Entry</p> */}
                            <p className="inter">Let’s Do This</p>
                        </div>
                        <div className="flex justify-center moodmessage-btn tp cursor-pointer" onClick={() => dispatch(setmodalgeneral(null))}>
                            <p className="inter">Maybe Later</p>
                        </div>
                    </div>
                
                </div>

            </div>

        </div>

    )


}


export default MoodMessage;



