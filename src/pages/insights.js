
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";

// components
import SegmentBar from "../components/segmentbar";
import BackDrop from "../components/backdrop";

import { icons } from "../utilities/icn";

// hooks
import { useOverallscore } from "../hooks/general/useOverallscore";
import { useAppuserout } from "../hooks/general/useAppuserout";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";






const Insights = () => {

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const { checkAppUser } = useAppuserout()
    const { handleAiOverallscore } = useOverallscore()

    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [thescores, setthescores] = useState({
        sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, 
    })

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

        handleAiOverallscore()

    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            
            setthescores({
                sun: user?.weekly_score_details?.sunday, 
                mon: user?.weekly_score_details?.monday,
                tue: user?.weekly_score_details?.tuesday,
                wed: user?.weekly_score_details?.wednesday,
                thu: user?.weekly_score_details?.thursday,
                fri: user?.weekly_score_details?.friday,
                sat: user?.weekly_score_details?.saturday,
            })
               
        }, 400); // Delay before animating in
    
        return () => clearTimeout(timeout);
    }, [user]);


      
    const setAlltoNull = () => {
        dispatch(setmodalgeneral(null))
    }


    return (  

        <div className="insights">

            {modalgeneral ?
                <BackDrop dropPress={setAlltoNull} />
            : null}

            <div className="weekly-cont">
                <h1 className="inter mgb-16">Wellness Week Overall Score</h1>

                <div className="ww-overall-score-box flex row gap-20">
                    <div className="week-score-label flex column gap-22">
                        <h4 className="inter">100</h4>
                        <h4 className="inter">80</h4>
                        <h4 className="inter">60</h4>
                        <h4 className="inter">40</h4>
                        <h4 className="inter">20</h4>
                    </div>
                    <div className="week-score-flex flex justify-space-between">
                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.sun}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>SUN</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.sunday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.mon}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>MON</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.monday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.tue}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>TUE</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.tuesday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.wed}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>WED</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.wednesday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.thu}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>THU</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.thursday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.fri}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>FRI</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.friday}%</h2>
                        </div>

                        <div className="week-score-item">
                            <SegmentBar 
                                percentage={thescores.sat}
                            />
                            <div className="week-score-days flex justify-center">
                                <h3>SAT</h3>
                            </div>
                            <h2 className="inter text-align-center">{user?.weekly_score_details?.saturday}%</h2>
                        </div>


                    </div>
                </div>
            </div>

            <div className="weekly-cont">
                <h1 className="inter mgb-16">Recomendations</h1>

                <div className="grid grid-column-1 gap-12">

                    <div className="recomendations-item flex row align-center gap-15">
                        <div className="recommendation-img flex align-center justify-center">
                            <img src={icons.insights.leaf} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter">Personalized Coping Strategies</h2>
                            <h3 className="inter mgb-14">{user?.weekly_score_details?.personalizedCopingStrategies.message}</h3>
                            <div className="flex row gap-7">
                                {user?.weekly_score_details?.personalizedCopingStrategies.suggestions.map(value => (
                                    <p className="inter" key={value}>{value}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="recomendations-item flex row align-center gap-15">
                        <div className="recommendation-img flex align-center justify-center">
                            <img src={icons.insights.user_jog} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter">Lifestyle Adjustments</h2>
                            <h3 className="inter mgb-14">{user?.weekly_score_details?.lifestyleAdjustments.message}</h3>
                            <div className="flex row gap-7">
                                {user?.weekly_score_details?.lifestyleAdjustments.suggestions.map(value => (
                                    <p className="inter" key={value}>{value}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="recomendations-item flex row align-center gap-15">
                        <div className="recommendation-img flex align-center justify-center">
                            <img src={icons.insights.chair} alt="" />
                        </div>
                        <div className="">
                            <h2 className="inter">Therapy Suggestions</h2>
                            <h3 className="inter mgb-14">{user?.weekly_score_details?.therapySuggestions.message}</h3>
                            <div className="flex row gap-7">
                                {user?.weekly_score_details?.therapySuggestions.suggestions.map(value => (
                                    <p className="inter" key={value}>{value}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    );
}
 
export default Insights;