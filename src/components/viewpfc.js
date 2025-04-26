
import { useState } from "react"


import { useSelector } from "react-redux"


import { icons } from "../utilities/icn"
import { images } from "../utilities/img"












const ViewPfComp = ({ viewpfc }) => {

    const user = useSelector((state) => state.user.value)

    const [pfcchatbox, setpfcchatbox] = useState(null)

    const pfcMessages = [
        {
            content: 'hey, how can you help me?',
            name: 'user',
            date: 171717171717
        }
    ]



        
    return(
        <div className={`view-pfc ${viewpfc ? 'active' : ''}`}>
            <div className="view-pfc-inner">

                <div className={`pfc-view-box ${!pfcchatbox ? 'active' : ''}`}>
                    <h2 className="inter">Professional Connections</h2>

                    {user?.connections ? user.connections.map((item, index) => (
                        <div className="flex align-center justify-space-between row mgb-15 cursor-pointer" key={index} onClick={() => setpfcchatbox(item.name)}>
                            <div className="flex row align-center rc-row">
                                <div className="rc-icon-box flex justify-center align-center">
                                    <img 
                                        src={item.name === 'AI Wellness Coach' ? images.connect.rs2 : item.name === 'AI Therapist' ? images.connect.rs1 : images.connect.rs3 } 
                                        alt="" 
                                    />
                                </div>
                                <div className="">
                                    <h3 className="inter">{item.name}</h3>
                                    {/* <h4 className="inter">Wellness coach</h4> */}
                                </div>
                            </div>
                            <div className="flex row gap-5 align-center">
                                <div className="rc-qa-icon cursor-pointer flex justify-center align-center">
                                    <img src={icons.connect.comment_fill} alt="" />
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>

                <div className={`pfc-chat-box ${pfcchatbox ? 'active' : ''}`}>
                    
                    
                    <div className="flex row align-center pfc-chat-title">
                        <div className="pfc-chat-back-arrow cursor-pointer" onClick={() => setpfcchatbox(null)}>
                            <img src={icons.general.angle_left} alt="" />
                        </div>
                        <img 
                            src={pfcchatbox === 'AI Wellness Coach' ? images.connect.rs2 : pfcchatbox === 'AI Therapist' ? images.connect.rs1 : images.connect.rs3 }
                            alt=""     
                        />
                        <h2 className="inter">{pfcchatbox ? pfcchatbox : ''}</h2>
                    </div>

                    <div className="pfc-chat-msg-cont">
                        <div className="pfc-msg-item">
                            <div className="pfc-msg-item-inner">
                                <p className="inter">hey how can you help me?</p>
                            </div>
                        </div>
                        <div className="pfc-msg-item rosa">
                            <div className="pfc-msg-item-inner">
                                <p className="inter">hi, i am rosa therapist ai, i can help you with ... Lorem ipsum dolor sit amet consectetur adipisicing </p>
                            </div>
                        </div>
                    </div>

                    <div className="pfc-chat-input flex justify-space-between align-center">

                        <input type="text" placeholder="tell me how you feel" />
                        <div className="pfc-chat-send flex justify-center align-center cursor-pointer">
                            <img src={icons.general.angle_right} alt="" />
                        </div>

                    </div>

                </div>

                

                
            </div>
        </div>
    )
}



export default ViewPfComp