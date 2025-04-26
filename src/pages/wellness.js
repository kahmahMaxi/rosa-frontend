import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CircularProgressbarWithChildren,
    buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// components
import BackDrop from "../components/backdrop";
import InModules from "../components/impcomp";

// utilities
import { icons } from "../utilities/icn";
import { formatSmartDate } from "../utilities/formatDates";

// hooks 
import { useAppuserout } from "../hooks/general/useAppuserout";
import { setmodalgeneral } from "../redux/modalsSlice";






const Wellness = () => {

    const { checkAppUser } = useAppuserout()

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [imcomp, setImcomp] = useState(null)
    const [imvalue, setImvalue] = useState(null)
    const [progress, setProgress] = useState(0)

    const [thescores, setthescores] = useState({
        physicalHealth: 0, mentalState: 0, stressLevels: 0, sleepQuality: 0, anxietyManagement: 0, depressionSupport: 0, stressReduction: 0, selfCare: 0,
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
        const timeout = setTimeout(() => {
            
            setthescores({
                physicalHealth: user?.current_scores?.physicalHealthScore, 
                mentalState: user?.current_scores?.mentalStateScore,
                stressLevels: user?.current_scores?.stressLevelScore,
                sleepQuality: user?.current_scores?.sleepQualityScore,
                anxietyManagement: user?.current_scores?.anxietyManagementScore,
                depressionSupport: user?.current_scores?.depressionSupportScore,
                stressReduction: user?.current_scores?.stressReductionScore,
                selfCare: user?.current_scores?.selfCareScore,
            })
               
        }, 300); // Delay before animating in
    
        return () => clearTimeout(timeout);
    }, [user]);

    const isNegative = (num) => num < 0

    function floorToDecimal(num, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.floor(num * factor) / factor;
    }

    const handleImRequest = (value) => {
        setImcomp(true)
        setImvalue(value)
    }


    const setAlltoNull = () => {
        setImcomp(null)
        setImvalue(null)
        dispatch(setmodalgeneral(null))
    }




    return ( 

        <div className="wellness">

            {imcomp || modalgeneral ? 
                <BackDrop dropPress={setAlltoNull} />
            : null}

            <InModules showmodule={imcomp} modulevalue={imvalue} />

            <div className="wellness-tracking-cont">

                <h1 className="inter">Wellness tracking</h1>

                <div className="grid row grid-column-2 gap-16">

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between row">
                            <div className="">
                                <h4 className="inter mgb-7">Physical health</h4>
                                <h2 className="inter mgb-8">{user?.current_scores?.physicalHealthScore ? user.current_scores.physicalHealthScore : '0'}%</h2>
                                <div className="flex row align-center gap-7">
                                    <div className="flex row align-center gap-4">
                                        <h5 
                                            className={
                                                `inter ${isNegative(user?.current_diff?.phydiff) === false ? 'green' : isNegative(user?.current_diff?.phydiff) === true ? 'red' : ''}`
                                            }
                                        >
                                            {floorToDecimal(user?.current_diff?.phydiff, 2)}%
                                        </h5>
                                        <img src={isNegative(user?.current_diff?.phydiff) === false ? icons.wellness.wellness_arrow_green : 
                                                    isNegative(user?.current_diff?.phydiff) === true ? icons.wellness.wellness_arrow_red : ''} 
                                            className="wellness-arrow" alt="" 
                                        />
                                    </div>
                                    <h5 className="inter">{formatSmartDate(user?.current_diff?.what_day)}</h5>
                                </div>
                            </div>

                            <div className="wellness-circular-progress-bar">
                                <CircularProgressbarWithChildren
                                    value={thescores.physicalHealth}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.4, // smooth animation
                                        pathColor: 'rgba(247, 144, 9, 1)', // orange
                                        trailColor: 'rgba(41, 48, 86, 1)', // dark background
                                        strokeLinecap: 'round'
                                    })}
                                >
                                    <img src={icons.wellness.physical_health} alt="" />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between row">
                            <div className="">
                                <h4 className="inter mgb-7">Mental State</h4>
                                <h2 className="inter mgb-8">{user?.current_scores?.mentalStateScore ? user.current_scores.mentalStateScore : '0'}%</h2>
                                <div className="flex row align-center gap-7">
                                    <div className="flex row align-center gap-4">
                                        <h5 
                                            className={
                                                `inter ${isNegative(user?.current_diff?.mtdiff) === false ? 'green' : isNegative(user.current_diff.mtdiff) === true ? 'red' : '' }`
                                            }
                                        >
                                            {floorToDecimal(user?.current_diff?.mtdiff, 2)}%
                                        </h5>
                                        <img src={isNegative(user?.current_diff?.mtdiff) === false ? icons.wellness.wellness_arrow_green : 
                                                    isNegative(user?.current_diff?.mtdiff) === true ? icons.wellness.wellness_arrow_red : ''  }
                                            className="wellness-arrow" alt="" 
                                        />
                                    </div>
                                    <h5 className="inter">{formatSmartDate(user?.current_diff?.what_day)}</h5>
                                </div>
                            </div>

                            <div className="wellness-circular-progress-bar">
                                <CircularProgressbarWithChildren
                                    value={thescores.mentalState}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.4, // smooth animation
                                        pathColor: 'rgba(155, 138, 251, 1)', // orange
                                        trailColor: 'rgba(41, 48, 86, 1)', // dark background
                                        strokeLinecap: 'round'
                                    })}
                                >
                                    <img src={icons.wellness.mental_state} alt="" />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between row">
                            <div className="">
                                <h4 className="inter mgb-7">Sleep Quality</h4>
                                <h2 className="inter mgb-8">{user?.current_scores?.sleepQualityScore ? user.current_scores.sleepQualityScore : '0'}%</h2>
                                <div className="flex row align-center gap-7">
                                    <div className="flex row align-center gap-4">
                                        <h5 
                                            className={
                                                `inter ${isNegative(user?.current_diff?.sqdiff) === false ? 'green' : isNegative(user.current_diff.sqdiff) === true ? 'red' : '' }`
                                            }
                                        >
                                            {floorToDecimal(user?.current_diff?.sqdiff, 2)}%
                                        </h5>
                                        <img src={isNegative(user?.current_diff?.sqdiff) === false ? icons.wellness.wellness_arrow_green : 
                                                    isNegative(user?.current_diff?.sqdiff) === true ? icons.wellness.wellness_arrow_red : '' } 
                                            className="wellness-arrow" alt="" 
                                        />
                                    </div>
                                    <h5 className="inter">{formatSmartDate(user?.current_diff?.what_day)}</h5>
                                </div>
                            </div>

                            <div className="wellness-circular-progress-bar">
                                <CircularProgressbarWithChildren
                                    value={thescores.sleepQuality}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.4, // smooth animation
                                        pathColor: 'rgba(54, 191, 250, 1)', // orange
                                        trailColor: 'rgba(41, 48, 86, 1)', // dark background
                                        strokeLinecap: 'round'
                                    })}
                                >
                                    <img src={icons.wellness.sleep_quality} alt="" />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between row">
                            <div className="">
                                <h4 className="inter mgb-7">Stress Level</h4>
                                <h2 className="inter mgb-8">{user?.current_scores?.stressLevelScore ? user.current_scores.stressLevelScore : '0'}%</h2>
                                <div className="flex row align-center gap-7">
                                    <div className="flex row align-center gap-4">
                                        <h5 
                                            className={
                                                `inter ${isNegative(user?.current_diff?.stldiff) === false ? 'green' : isNegative(user.current_diff.stldiff) === true ? 'red' : '' }`
                                            }
                                        >
                                            {floorToDecimal(user?.current_diff?.stldiff, 2)}%
                                        </h5>
                                        <img src={isNegative(user?.current_diff?.stldiff) === false ? icons.wellness.wellness_arrow_green : 
                                                    isNegative(user?.current_diff?.stldiff) === true ? icons.wellness.wellness_arrow_red : '' } 
                                            className="wellness-arrow" alt="" 
                                        />
                                    </div>
                                    <h5 className="inter">{formatSmartDate(user?.current_diff?.what_day)}</h5>
                                </div>
                            </div>

                            <div className="wellness-circular-progress-bar">
                                <CircularProgressbarWithChildren
                                    value={thescores.stressLevels}
                                    styles={buildStyles({
                                        pathTransitionDuration: 1.4, // smooth animation
                                        pathColor: 'rgba(246, 112, 199, 1)', // orange
                                        trailColor: 'rgba(41, 48, 86, 1)', // dark background
                                        strokeLinecap: 'round'
                                    })}
                                >
                                    <img src={icons.wellness.stress_levels} alt="" />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>



                </div>

            </div>

            <div className="wellness-tracking-cont">

                <h1 className="inter">Intervention Modules</h1>

                <div className="grid grid-column-1 gap-12">

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between align-center mgb-14">
                            <div className="">
                                <h3 className="inter mgb-8">Anxiety Management</h3>
                                <h4 className="inter">Tool and techniques to manage anxiety</h4>
                            </div>
                            <h2 className="inter">{user?.current_scores?.anxietyManagementScore}%</h2>
                        </div>
                        <div className="wellness-tracking-horizontal-progress-bar">
                            <div style={{ width: `${thescores.anxietyManagement}%` }}></div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between align-center mgb-14">
                            <div className="">
                                <h3 className="inter mgb-8">Depression Support</h3>
                                <h4 className="inter">Resources for depression management</h4>
                            </div>
                            <h2 className="inter">{user?.current_scores?.depressionSupportScore}%</h2>
                        </div>
                        <div className="wellness-tracking-horizontal-progress-bar">
                            <div style={{ width: `${thescores.depressionSupport}%` }}></div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between align-center mgb-14">
                            <div className="">
                                <h3 className="inter mgb-8">Stress Reduction</h3>
                                <h4 className="inter">Effective stress reduction methods</h4>
                            </div>
                            <h2 className="inter">{user?.current_scores?.stressReductionScore}%</h2>
                        </div>
                        <div className="wellness-tracking-horizontal-progress-bar">
                            <div style={{ width: `${thescores.stressReduction}%` }}></div>
                        </div>
                    </div>

                    <div className="wellness-tracking-item">
                        <div className="flex justify-space-between align-center mgb-14">
                            <div className="">
                                <h3 className="inter mgb-8">Self-Care Toolkit</h3>
                                <h4 className="inter">Personalized self-care activittes</h4>
                            </div>
                            <h2 className="inter">{user?.current_scores?.selfCareScore}%</h2>
                        </div>
                        <div className="wellness-tracking-horizontal-progress-bar">
                            <div style={{ width: `${thescores.selfCare}%` }}></div>
                        </div>
                    </div>

                </div>

            </div>


        </div>

    );
}
 
export default Wellness;