

import { icons } from "../utilities/icn";

const Crisis = () => {
    return ( 

        <div className="crisis">

            <div className="crisis-title-box pdt pdl pdr">
                <h2 className="inter">Crisis Support</h2>
                <p className="inter">Immediate help resources</p>
            </div>

            <div className="nih-container pdl pdr pdb">
                <div className="nih-box">
                    <h2 className="inter">Need immediate help</h2>
                    <h3 className="inter">If you're experiencing a mental health emergency, please call our crisis support hotline to get immediate support.</h3>
                    <p className="cursor-pointer inter">Call Now</p>
                </div>
            </div>

            <div className="grid grid-column-2 gap-20 pdl pdr pdb rgr-item">

                <div className="crisis-item">
                    <h3 className="inter">Immediate Help</h3>


                    <div className="cr-item">
                        <div className="flex row align-center mgb-15">
                            <div className="cr-icon-container flex align-center justify-center">
                                {/* <div className="ct-icon-box"> */}
                                    <img src={icons.crisis.phone_red} alt="" />
                                {/* </div> */}
                            </div>
                            <div className="">
                                <h4 className="inter">Emergency Contact</h4>
                                <h5 className="inter">Call your designated emergency contact</h5>
                            </div>
                        </div>
                        <div className="cr-action flex justify-center align-center cursor-pointer">
                            <p className="inter">Call  Now</p>
                        </div>
                    </div>

                    <div className="cr-item">
                        <div className="flex row align-center mgb-15">
                            <div className="cr-icon-container flex align-center justify-center">
                                {/* <div className="ct-icon-box"> */}
                                    <img src={icons.crisis.phone_red} alt="" />
                                {/* </div> */}
                            </div>
                            <div className="">
                                <h4 className="inter">Crisis Hotline</h4>
                                <h5 className="inter">24/7 professional mental health support</h5>
                            </div>
                        </div>
                        <div className="cr-action flex justify-center align-center cursor-pointer">
                            <p className="inter">Call Hotline</p>
                        </div>
                    </div>

                    <div className="cr-item">
                        <div className="flex row align-center mgb-15">
                            <div className="cr-icon-container flex align-center justify-center blue">
                                {/* <div className="ct-icon-box"> */}
                                    <img src={icons.crisis.location_blue} alt="" />
                                {/* </div> */}
                            </div>
                            <div className="">
                                <h4 className="inter">Nearest Support Center</h4>
                                <h5 className="inter">Find mental health facilities near you</h5>
                            </div>
                        </div>
                        <div className="cr-action flex justify-center align-center cursor-pointer dark">
                            <p className="inter">View Map</p>
                        </div>
                    </div>

                    <div className="cr-item">
                        <div className="flex row align-center mgb-15">
                            <div className="cr-icon-container flex align-center justify-center green">
                                {/* <div className="ct-icon-box"> */}
                                    <img src={icons.crisis.stress_management} alt="" />
                                {/* </div> */}
                            </div>
                            <div className="">
                                <h4 className="inter">Immediate Grounding Techniques</h4>
                                <h5 className="inter">Quick exercises to help manage anxiety</h5>
                            </div>
                        </div>
                        <div className="cr-action flex justify-center align-center cursor-pointer dark">
                            <p className="inter">Start Now</p>
                        </div>
                    </div>
                </div>

                <div className="crisis-item">
                    <h3 className="inter">Grounding Exercises</h3>


                    <div className="cr-item ground">
                        <div className="mgb-15">
                            <h4 className="inter">5-4-3-2-1 Technique</h4>
                            <h5 className="inter">
                                Focus on your senses to ground yourself in the present moment:<br /><br />
                            </h5>
                            <h6>
                                5 things you can see <br />
                                4 things you can touch <br />
                                3 things you can hear <br />
                                2 things you can smell <br />
                                1 thing you can taste <br />
                            </h6>
                        </div>
                        <div className="guide-action flex justify-center align-center cursor-pointer">
                            <p className="inter">Start Guided Exercise</p>
                        </div>
                    </div>

                    <div className="cr-item ground">
                        <div className="mgb-15">
                            <h4 className="inter">Deep Breathing</h4>
                            <h5 className="inter">
                                A simple breathing exercise to help calm your mind:<br /><br />
                            </h5>
                            <h6>
                                Breathe in slowly through your nose for 4 seconds
                                Hold your breath for 7 seconds
                                Exhale slowly through your mouth for 8 seconds
                                Repeat 5 times
                            </h6>
                        </div>
                        <div className="guide-action flex justify-center align-center cursor-pointer">
                            <p className="inter">Start Guided Exercise</p>
                        </div>
                    </div>

                    <div className="cr-item green">
                        <div className="mgb-15">
                            <div className="flex row align-center">
                                <div className="nms-icon">
                                    <img src={icons.crisis.intelligence_network} alt="" />
                                </div>
                                <h4 className="inter">Need more support?</h4>
                            </div>
                            <h5 className="inter">
                                These exercises are meant for immediate relief. If you're experiencing ongoing distress, please contact a mental health professional.
                            </h5>
                        </div>
                        <div className="nms-action flex justify-center align-center cursor-pointer">
                            <p className="inter">Connect with Therapist</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}
 
export default Crisis;