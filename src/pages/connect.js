
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { icons } from "../utilities/icn";

// components
import BackDrop from "../components/backdrop";
import ViewPfComp from "../components/viewpfc";
import AddPfComp from "../components/addpfc";
import { images } from "../utilities/img";

// hooks
import { useAppuserout } from "../hooks/general/useAppuserout";

// utilities
import { formatSmartDate } from "../utilities/formatDates";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";


const Connect = () => {

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const { checkAppUser } = useAppuserout()

    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    // const [viewpfc, setViewpfc] = useState(null)
    const [addpfc, setAddpfc] = useState(null)
    const [whatpfc, setwhatpfc] = useState(null)

    useEffect(() => {
        checkAppUser()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup: Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleWhatpfc = (value) => {
        dispatch(setmodalgeneral('pfc'))
        setwhatpfc(value)
    }

    const setAlltoNull = () => {
        // setAddpfc(null)
        setwhatpfc(null)
        dispatch(setmodalgeneral(null))
    }


    return (  

        <div className="connect">

            {modalgeneral ? 
                <BackDrop dropPress={setAlltoNull} />
            : null}

            {/* <ViewPfComp viewpfc={viewpfc} /> */}
            
            <AddPfComp whatpfc={whatpfc} />

            <div className="mgb-32 flex row wrap gap-24">

                <div className="start-session-box">
                    <div className="flex justify-center">
                        <img src={images.general.rs_logo_glow} alt="" />
                    </div>
                    <h2 className="inter text-align-center mgb-7">AI Therapy Session</h2>
                    <h3 className="inter text-align-center mgb-15">Available 24/7</h3>
                    <h4 className="inter text-align-center cursor-pointer" onClick={() => handleWhatpfc('AI Therapist')}>Start Session</h4>
                </div>

                <div className="connect-box-item recent-box">
                    <h2 className="mgb-15 inter">Recent Conversations</h2>

                    <div className="grid grid-column-1 gap-10">
                        {user?.recentConversations?.map((item, index) => (
                            <div className="recent-item flex justify-space-between align-center" key={index}>
                                <div className="">
                                    <div className="recent_item_text flex row align-center gap-8">
                                        <img 
                                            src={item.name === 'AI Wellness Coach' ? images.connect.rs4_1 : item.name === 'AI Therapist' ? images.connect.rs1 : images.connect.rs5 }
                                            alt="" 
                                        />
                                        <div className="">
                                            <h3 className="inter mgb-5">{item.name}</h3>
                                            <h5 className="inter text-transform-capitalize">{item.shortname} <span className="inter">{formatSmartDate(item.date)}</span></h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment_icon cursor-pointer" onClick={() => handleWhatpfc(item.name)}>
                                    <img src={icons.connect.comment_ot} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="connect-box-item">

                <h1 className="inter mgb-16">Support Network</h1>

                <div className={`grid row ${windowWidth > 500 ? 'grid-column-2' : 'grid-column-1'} gap-24`}>
                    <div className="support-item flex row gap-16 align-center cursor-pointer" onClick={() => dispatch(setmodalgeneral('pfc'))}>
                        <div className="support-item-icon flex align-center justify-center">
                            <img src={icons.connect.briefcase_ot} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter mgb-5">Professional Connections</h2>
                            <h4 className="inter">3 connections</h4>
                        </div>
                    </div>

                    <div className="support-item flex row gap-16 align-center cursor-pointer">
                        <div className="support-item-icon flex align-center justify-center purple">
                            <img src={icons.connect.user_group} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter mgb-5">Community Groups</h2>
                            <h4 className="inter">1 connections</h4>
                        </div>
                    </div>

                    <div className="support-item flex row gap-16 align-center cursor-pointer" onClick={() => handleWhatpfc('AI Therapist')}>
                        <div className="support-item-icon flex align-center justify-center green">
                            <img src={icons.connect.smile_ot} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter mgb-5">Therapist Portal</h2>
                            <h4 className="inter">1 connections</h4>
                        </div>
                    </div>

                    <div className="support-item flex row gap-16 align-center cursor-pointer">
                        <div className="support-item-icon flex align-center justify-center red">
                            <img src={icons.connect.warn_ot} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter mgb-5">Emergency Contacts</h2>
                            <h4 className="inter">2 connections</h4>
                        </div>
                    </div>
                </div>

            </div>



        </div>

    );
}
 
export default Connect;



