import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


// components
import BackDrop from "../components/backdrop";
import UpdateInfo  from "../components/updateInfo";
import CheckinBox from "../components/checkinBox";
import BreathingExercise from "../components/breathingExercise";
import MoodLogModal from "../components/moodlogmodal";
import MoodRing from "../components/moodring";
import WellnessScore from "../components/wellness-score";

// states_g
import { setgtMessage } from "../redux/gtmsgSlice";
import { gtNeutral } from "../redux/gtstatusSlice";
import { openModal, closeModal } from "../redux/moodmodalSlice";
import { setmodalgeneral } from "../redux/modalsSlice";

// hooks
import { useAppuserout } from "../hooks/general/useAppuserout";
import { useAiscore } from "../hooks/general/useAiscore";

// utilities
import { icons } from "../utilities/icn";
import { images } from "../utilities/img";
import { allQuestions } from "../utilities/allQuestions";


const Home = () => {  

    const navigate = useNavigate()
    const { checkAppUser } = useAppuserout()
    const { handleAiscore } = useAiscore()
    
    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)
    const showModal = useSelector((state) => state.showmodal.value)
    const moodadd = useSelector((state) => state.moodadd.value)
    
    const dispatch = useDispatch()
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [breathingexercise, setbe] = useState(null)
    const [checkin, setcheckinbox] = useState(null)
    const [enterinfo, setEnterinfo] = useState(true)
    const [demodep, setdemodep] = useState(null)

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

    useEffect(() => {
        if(user) {
            if(!user.physical_info) {
                setEnterinfo(true)
            } else {
                setEnterinfo(null)
            }
        }
    }, [user])

    useEffect(() => {
        if(user) {
            if(!enterinfo && !user.physical_info) {
                dispatch(gtNeutral())
                dispatch(setgtMessage('you can update your info later in profile'))
            }
        }
    }, [enterinfo])



    const MOOD_MODAL_KEY = "rosa_mood_modal"
    const LAST_SHOWN_KEY = "rosa_last_shown"
    // const [showModal, setShowModal] = useState(null);
    const [questions, setQuestions] = useState([]);

    const getShuffledQuestions = () => {
        const previousData = JSON.parse(localStorage.getItem(MOOD_MODAL_KEY)) || {};
        const lastQuestions = previousData.lastQuestions || [];
        
        const filtered = allQuestions.filter(q => !lastQuestions.includes(q));
        const pool = filtered.length >= 4 ? filtered : allQuestions;
        const shuffled = pool.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }


    useEffect(() => {

        const checkMoodInterval = () => {
            const lastShown = parseInt(localStorage.getItem(LAST_SHOWN_KEY) || 0, 10);
            const now = Date.now();
            const hoursPassed = (now - lastShown) / (1000 * 60 * 60);
            // const threshold = 10 / 3600; // 🕒 10 seconds
            const threshold = 0.5; // 30 min
    
            const modalData = JSON.parse(localStorage.getItem(MOOD_MODAL_KEY)) || {};
    
            if (hoursPassed >= threshold && !modalData.lastAnswered) {
                const qs = getShuffledQuestions();
                setQuestions(qs);
                // setShowModal(true);
                dispatch(openModal())
    
                localStorage.setItem(MOOD_MODAL_KEY, JSON.stringify({
                    lastQuestions: qs,
                    lastAnswered: null
                }));
    
                localStorage.setItem(LAST_SHOWN_KEY, Date.now());
            }
        };
    
        checkMoodInterval();
        const interval = setInterval(checkMoodInterval, 5 * 60 * 1000); // Check every 5 min
        return () => clearInterval(interval);
    
    }, []);

    // handle open log mood modal
    const handleOpenLogMood = () => {
        const qs = getShuffledQuestions();
        setQuestions(qs);
        dispatch(openModal())

        localStorage.setItem(MOOD_MODAL_KEY, JSON.stringify({
            lastQuestions: qs,
            lastAnswered: null
        }));

        localStorage.setItem(LAST_SHOWN_KEY, Date.now());
    }

    
    useEffect(() => {
        handleAiscore()
    }, [moodadd])





    const setAlltoNull = () => {
        setEnterinfo(null)
        setcheckinbox(null)
        setbe(null)
        dispatch(closeModal())
        dispatch(setmodalgeneral(null))
    }



    return ( 

        <div className="dashboard">

            {enterinfo || checkin || modalgeneral || showModal ?
                <BackDrop dropPress={setAlltoNull} />
            : null}

            <UpdateInfo 
                showinfo={enterinfo}
            />

            <CheckinBox 
                showcheckin={checkin}
            />
            
            <BreathingExercise 
                showbe={breathingexercise}
            />

            <MoodLogModal
                // showModal={showModal}
                questions={questions}
                // submit={handleSubmit}
            />

            {windowWidth < 500 ?
                <div className="grid grid-column-2 row gap-10 mgb-20">
                    <div className="flex row align-center justify-center home-quick-btn sos">
                        <p className="inter">SOS</p>
                    </div>
                    <div className="flex row align-center justify-center gap-7 home-quick-btn">
                        <img src={icons.home.wallet_ot} alt="" />
                        <p className="inter">Connect</p>
                    </div>
                </div>
            : null}

            <div className={`grid row ${windowWidth < 500 ? 'grid-column-1' : 'grid-column-3'} new-qa-cont`}>

                <div className={`new-qa-box ${windowWidth < 500 ? 'flex row gap-10' : ''} cursor-pointer`} onClick={handleOpenLogMood}>
                    <div className="flex justify-center align-center new-qa-box-icon">
                        <img src={icons.home.smile} alt="" />
                    </div>
                    <div className="">
                        <h2 className="inter">Log your mood</h2>
                        <p className="inter">Tell us how you feel today so we can help you</p>
                    </div>
                </div>

                <Link to="/insights" className={`new-qa-box plus ${windowWidth < 500 ? 'flex row gap-10' : ''}`}>
                    <div className="flex justify-center align-center new-qa-box-icon">
                        <img src={icons.home.plus} alt="" />
                    </div>
                    <div className="">
                        <h2 className="inter">Wellness</h2>
                        <p className="inter">View recommendations and exercises</p>
                    </div>
                </Link>

                <div className={`new-qa-box air ${windowWidth < 500 ? 'flex row gap-10' : ''} cursor-pointer`} onClick={() => dispatch(setmodalgeneral('breathing exercise'))}>
                    <div className="flex justify-center align-center new-qa-box-icon">
                        <img src={icons.home.air} alt="" />
                    </div>
                    <div className="">
                        <h2 className="inter">Breathing</h2>
                        <p className="inter">Calm the rhythm of your heart and organize your thoughts</p>
                    </div>
                </div>

            </div>

            <div className={`grid row ${windowWidth < 500 ? 'grid-column-1' : 'grid-column-2'} stress-mood-cont`}>

                <div className="stress-mood-box">
                    <div className="flex justify-center">
                        {/* <div className="stress-box"> */}
                        <MoodRing moodLevel={user?.current_scores?.mentalStateScore} />
                        {/* </div> */}
                    </div>
                    <h2 className="inter text-align-center">Moderated stress</h2>
                    <p className="inter text-align-center">Current Mood</p>
                </div>

                <div className="stress-mood-box">
                    <div className="flex justify-center">
                        <WellnessScore score={user?.current_scores?.dailyWellnessScore || 0} />
                        {/* <div className="wn-box">
                            <div className="flex align-center row wellness-score-row">
                                <h3 className="inter">93</h3>
                                <h3 className="inter active">94</h3>
                                <h3 className="inter">95</h3>
                            </div>
                            <div className="wn-bars flex justify-center"><img src={icons.home.wn_bars} alt="" /></div>
                        </div> */}
                    </div>
                    <h2 className="inter text-align-center">Daily Wellness Score</h2>
                    <p className="inter text-align-center">Based on your actions</p>
                </div>

            </div>

            

            

            

        </div>

        
            


    );
}
 
export default Home;