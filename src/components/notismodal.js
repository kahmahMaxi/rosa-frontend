
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

                <div className="notis-item flex row gap-10">
                    <img src={images.connect.rs1} alt="" />

                    <div className="">
                        <h3 className="inter mgb-10">Welcome to Neurosa 🌐🧠</h3>
                        <h4 className="inter">
                            hey {user?.username}, you’ve just joined a movement at the frontier of wellness and web3.
                            Connect your wallet, explore decentralized features, and be part of a future where tech meets self-care.
                            Let’s shape the next era—together.
                        </h4>
                    </div>
                </div>

            </div>

        </div>

    )


}


export default Notifications;



