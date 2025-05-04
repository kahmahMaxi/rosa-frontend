
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { icons } from "../utilities/icn";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";
import { images } from "../utilities/img";




const Notifications = () => {

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()
    

    const setAlltoNull = () => {
        
    }


    return (

        <div className={`notis-cont ${modalgeneral === 'notis' ? 'active' : ''}`}>

            <div className={`notis-inner`}>

                <div className="flex justify-space-between align-center mgb-16">
                    <h2 className="inter">Notifications</h2>

                    <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(setmodalgeneral(null))}>
                        <img src={icons.header.close} alt="" />
                    </div>
                </div>

                <div className="grid grid-column-1 gap-10">
                    {(user?.notis || []).map((item, index) => (
                        <div className="notis-item flex row gap-10" key={index}>
                            <img src={images.connect.rs1} alt="" />

                            <div className="">
                                <h3 className="inter mgb-10">{item.title}</h3>
                                <h4 className="inter">{item.body}</h4>
                            </div>
                        </div>
                    )) }
                </div>

            </div>

        </div>

    )


}


export default Notifications;



