
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { icons } from "../utilities/icn";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";




const Sos = ({ windowWidth }) => {

    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()


    const setAlltoNull = () => {
        dispatch(setmodalgeneral(null))
    }


    return (

        <div className={`sos-cont ${modalgeneral === 'sos' ? 'active' : ''}`}>

            <div className={`sos-inner`}>

                <div className="mgb-16 flex justify-space-between align-center">
                    <h2 className="inter">Crisis Support</h2>

                    <div className="flex justify-center align-center cursor-pointer modals-close-icon" onClick={setAlltoNull}>
                        <img src={icons.header.close} alt="" />
                    </div>
                </div>

                <div className={`grid ${windowWidth > 500 ? 'grid-column-2' : 'grid-column-1'} gap-16 row`}>

                    <div className="sos-modal-item red">
                        <img src={icons.crisis.crisis_support} className="sos-modal-cr-img mgb-16" alt="" />
                        <h3 className="inter mgb-5">Crisis hotline</h3>
                        <h4 className="inter mgb-15">24/7 professional mental health support</h4>
                        <div className="sos-item-btn flex justify-center gap-10 red cursor-pointer">
                            <img src={icons.crisis.call} alt="" />
                            <p className="inter">Call</p>
                        </div>
                    </div>

                    <div className="sos-modal-item">
                        <div className="sos-modal-item-icon flex justify-center align-center mgb-16">
                            <img src={icons.crisis.hand_heart} alt="" />
                        </div>
                        <h3 className="inter mgb-5">Emergency contact</h3>
                        <h4 className="inter mgb-15">Call your designated emergency contact</h4>
                        <div className="sos-item-btn flex justify-center gap-10 cursor-pointer">
                            <img src={icons.crisis.call} alt="" />
                            <p className="inter">Call</p>
                        </div>
                    </div>

                    <div className="sos-modal-item">
                        <div className="sos-modal-item-icon flex justify-center align-center mgb-16 blue">
                            <img src={icons.crisis.building} alt="" />
                        </div>
                        <h3 className="inter mgb-5">Support Center</h3>
                        <h4 className="inter mgb-15">Find mental health facilities near you</h4>
                        <div className="sos-item-btn flex justify-center gap-10 cursor-pointer blue">
                            <img src={icons.crisis.location_p} alt="" />
                            <p className="inter">Find Nearest</p>
                        </div>
                    </div>

                    <div className="sos-modal-item">
                        <div className="sos-modal-item-icon flex justify-center align-center mgb-16 yellow">
                            <img src={icons.crisis.bright} alt="" />
                        </div>
                        <h3 className="inter mgb-5">Grounding Techniques</h3>
                        <h4 className="inter mgb-15">Quick exercises to help manage anxiety</h4>
                        <div className="sos-item-btn flex justify-center gap-10 cursor-pointer blue">
                            <img src={icons.crisis.play} alt="" />
                            <p className="inter">Start Now</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )


}


export default Sos;



