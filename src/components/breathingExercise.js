
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { icons } from "../utilities/icn";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";




const BreathingExercise = ({ showbe }) => {

    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()

    const breathingExercises = [
        {
            icon: icons.general.spa_3d_female,
            name: 'Box breathing',
            shortnote: 'Calming technique with four equal parts: inhale, hold, exhale, pause.',
            steps: [
                { title: 'Inhale for 4 seconds', content: 'Slowly breathe in through your nose, letting your lungs fill up completely. Focus on expanding your belly as you count to four in your mind.', icon: '🫁'},
                { title: 'Hold for 4 seconds', content: 'Gently hold your breath. Try not to tense your body. Just stay still and feel the air inside you as you mentally count to four.', icon: '⏸️'},
                { title: 'Exhale for 4 seconds', content: 'Breathe out slowly and evenly through your mouth, releasing tension from your chest and shoulders. Exhale fully while counting to four.', icon: '🌬️'},
                { title: 'Hold for 4 seconds', content: 'Again, hold your breath with empty lungs, staying relaxed. Count to four before starting the next round.', icon: '🕒'},
            ]
        },
        {
            icon: icons.general.timer,
            name: '4-7-8 Breathing',
            shortnote: 'Technique involves inhaling for 4 seconds, holding the breath for 7 seconds, and exhaling for 8 seconds to promote relaxation and reduce stress.',
            steps: [
                { title: 'Inhale for 4 seconds', content: 'Breathe in through your nose quietly and deeply for a count of four, focusing on filling your lungs gently.', icon: '🫁'},
                { title: 'Pause for 7 seconds', content: 'Hold your breath comfortably. Try to keep your body still and calm as you count to seven—this is the most important part.', icon: '⏹️'},
                { title: 'Exhale for 8 seconds', content: 'Slowly and completely exhale through your mouth. Make a soft “whooshing” sound if you like, and count to eight as you breathe out.', icon: '😮‍💨'},
                { title: 'Repeat cycle', content: 'Try this for four full cycles. With each repetition, you should feel more relaxed and clear-headed.', icon: '🔁'},
            ]
        },
        {
            icon: icons.general.lips,
            name: 'Pursed-Lip Breathing',
            shortnote: 'Involves inhaling slowly through the nose and exhaling gently through pursed lips, helping to improve lung function and reduce shortness of breath.',
            steps: [
                { title: 'Inhale through your nose (2 seconds)', content: 'Breathe in slowly and gently through your nose. Try not to rush—keep the pace natural and light.', icon: '👃'},
                { title: 'Pause your lips', content: "Press your lips together as if you're about to whistle or blow out a candle. This slows your breath down and helps control airflow.", icon: '👄'},
                { title: 'Exhale slowly (4 seconds)', content: 'Blow the air out through your pursed lips slowly and evenly. Focus on making the exhale twice as long as the inhale.', icon: '💨'},
                { title: 'Repeat and relax several times', content: 'Continue this breathing pattern for a few minutes. It’s excellent for calming panic or catching your breath. Continue at your own pace.', icon: '🔁'},
            ]
        },
    ]
    // const [steps, setSteps] = useState(null)
    const [currentStep, setCurrentstep] = useState(null)
    const [currentindex, setcurrentindex] = useState(0)

    const handleNext = () => {
        const indexCheck = currentindex + 1
        if(currentStep.steps.length !== indexCheck) {
            const newIndex = 1 + currentindex
            setcurrentindex(newIndex)
        }
    }
    
    const handlePrev = () => {
        if(currentindex !== 0) {
            const newIndex = -1 + currentindex
            setcurrentindex(newIndex)
        }
    }

    const setAlltoNull = () => {
        setcurrentindex(0)
        setCurrentstep(null)
    }


    return (

        <div className={`breathing-exercise-cont ${modalgeneral === 'breathing exercise' ? 'active' : ''}`}>

            <div className={`be-inner ${currentStep ? 'reducedheight' : ''}`}>

                <div className={`be-view-box ${!currentStep ? 'active' : ''}`}>
                    <div className="flex justify-space-between align-center mgb-16">
                        <h2 className="inter">Breathing Exercises</h2>

                        <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(setmodalgeneral(null))}>
                            <img src={icons.header.close} alt="" />
                        </div>
                    </div>

                    <div className="grid grid-column-1 gap-8">

                        {breathingExercises?.map((item, index) => (
                            <div className="flex be-item row gap-16" key={index}>
                                <div className="be-show-icon flex justify-center align-center">
                                    <img src={item.icon} alt="" />
                                </div>
                                <div className="">
                                    <h3 className="inter mgb-5">{item.name}</h3>
                                    <h4 className="inter mgb-12">{item.shortnote}</h4>
                                    <h5 className="inter cursor-pointer" onClick={() => setCurrentstep(item)}>Start exercise</h5>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className={`be-steps-box ${currentStep ? 'active' : ''}`}>

                    <div className="mgb-17 flex align-center justify-space-between">
                        <div className="flex row align-center gap-16">
                            <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={setAlltoNull}>
                                <img src={icons.general.arrow_left} alt="" />
                            </div>
                            <div className="flex row align-center gap-12">
                                <div className="steps-icons-show flex justify-center align-center">
                                    <img src={currentStep?.icon} alt="" />
                                </div>
                                <h6 className="inter">{currentStep?.name}</h6>
                            </div>
                        </div>

                        <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(setmodalgeneral(null))}>
                            <img src={icons.header.close} alt="" />
                        </div>
                    </div>

                    <div className={`mgb-32 step-count-box grid gap-4 grid-column-${(currentStep?.steps.length)}`}>
                        {currentStep?.steps.map((item, index) => (
                            <div className={`step-count-item ${index === currentindex ? 'pink' : index < currentindex ? 'green' : ''}`}></div>
                        ))}
                    </div>

                    <p className="mgb-24 text-align-center">{currentStep?.steps[currentindex].icon}</p>

                    <h3 className="inter mgb-10 text-align-center">{currentStep?.steps[currentindex].title}</h3>

                    <h4 className="inter text-align-center mgb-24">{currentStep?.steps[currentindex].content}</h4>

                    <div className="grid grid-column-2 gap-12">
                        <div className="">
                            {currentindex !== 0 ? <button onClick={handlePrev}>Back</button> : null}
                        </div>
                        
                        <div className="">
                            {(currentStep?.steps.length !== (currentindex+1)) ? <button className="be-next" onClick={handleNext}>Next</button> : null}
                        </div>
                    </div>


                </div>

            </div>

        </div>

    )


}


export default BreathingExercise;



