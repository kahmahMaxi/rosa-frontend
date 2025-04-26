


import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"


import { icons } from "../utilities/icn"
import { images } from "../utilities/img"


// hooks
import { useAddconnection } from "../hooks/patch/useAddconnection"
import { useAichat } from "../hooks/patch/useAichat"


// states
import { setUser } from "../redux/userSlice"




const AddPfComp = ({ addpfc, whatpfc }) => {

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()
    const messagesEndRef = useRef(null);

    const { addConnection } = useAddconnection()
    const { handleAireply, loading } = useAichat()

    const aiconnections = [
        {name: 'AI Therapist', shortname: 'therapist'},
        {name: 'AI Wellness Coach', shortname: 'coach'},
        {name: 'AI Instructor', shortname: 'instructor'},
    ]
    const [pfcchatbox, setpfcchatbox] = useState(null)
    const [inputmessage, setInputmessage] = useState('')
    const [messagestoshow, setMessagestoshow] = useState([])


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [user, pfcchatbox]);

    useEffect(() => {
        if(whatpfc) {
            setpfcchatbox(whatpfc)
        }
    }, [whatpfc])

    const handleConnectionAddtion = async (value) => {
        const connectItem = { name: value }
        await addConnection(connectItem)
    }

    const checkAdded = (value) => {
        if(user) {
            if(user.connections) {
                const check = user.connections.filter(item => item.name === value)
                if(check.length > 0) {
                    return true
                } else {
                    return null
                }
            }
        }
    }

    // const getMessagesToShow = (theuser, type) => {
    //     switch (type) {
    //         case 'AI Therapist':
    //             const therapymessages = theuser.chatConnections.therapy || []
    //             setMessagestoshow(therapymessages)
    //             break;
    //         case 'AI Wellness Coach':
    //             const coachmessages = theuser.chatConnections.coach || []
    //             setMessagestoshow(coachmessages);
    //             break;
    //         case 'AI Instructor':
    //             const instructormessages = theuser.chatConnections.instructor || []
    //             setMessagestoshow(instructormessages);
    //             break;
    //         default:
    //             const defaultmessages = theuser.chatConnections.therapy || []
    //             setMessagestoshow(defaultmessages);
    //             break;
    //     }
    // }

    // cleaner version
    const getMessagesToShow = (theuser, type) => {
        const map = {
            'AI Therapist': theuser.connectionsChats?.therapy || [],
            'AI Wellness Coach': theuser.connectionsChats?.coach || [],
            'AI Instructor': theuser.connectionsChats?.instructor || []
        };
    
        const selectedMessages = map[type] || theuser.chatConnections?.therapy || [];
        setMessagestoshow(selectedMessages);
    };
    
    useEffect(() => {
        if(pfcchatbox && user) {
            getMessagesToShow(user, pfcchatbox)
        }
    }, [pfcchatbox, user])
    

    
    const handleChatting = async () => {
        if(!loading) {
            if(inputmessage.length > 1 && pfcchatbox) {
                console.log(inputmessage, pfcchatbox)
                if(user) {
                    // const prevMessages = user.connectionsChats || []
                    const prevtherapy = user.connectionsChats?.therapy || []
                    const prevcoach = user.connectionsChats?.coach || []
                    const previnstructor = user.connectionsChats?.instructor || []
    
                    const newMessage = { role: 'user', content: inputmessage }
    
                    const itemToUpdate = (type) => {
                        switch (type) {
                            case 'AI Therapist':
                                const therapyupdate = { therapy: [...prevtherapy, newMessage], coach: prevcoach, instructor: previnstructor }
                                return therapyupdate;
                            case 'AI Wellness Coach':
                                const coachupdate = { coach: [...prevcoach, newMessage], therapy: prevtherapy, instructor: previnstructor }
                                return coachupdate;
                            case 'AI Instructor':
                                const instructorupdate = { instructor: [...previnstructor, newMessage], therapy: prevtherapy, coach: prevcoach }
                                return instructorupdate;
                            default:
                                const defaultupdate = { therapy: [...prevtherapy, newMessage], coach: prevcoach, instructor: previnstructor }
                                return defaultupdate;
                        }
                    }
                    var itemUpdate = { ...user, connectionsChats: itemToUpdate(pfcchatbox) }
                    // var itemUpdate = { ...user, connectionsChats: [...prevMessages, ...newMessage] }
                    // console.log(itemUpdate)
                    dispatch(setUser(itemUpdate))
    
                    await handleAireply(pfcchatbox, inputmessage)
                }
            } else {
                console.log('no inputmessage or pfcchatbox')
            }
        }
        
    }

    useEffect(() => {
        setInputmessage('')
    }, [loading])



    return(
        <div className={`view-pfc ${addpfc ? 'active' : ''}`}>
            <div className={`view-pfc-inner modal-general ${pfcchatbox ? 'increasedheight' : ''}`}>

                <div className={`pfc-view-box ${!pfcchatbox ? 'active' : ''}`}>
                    <div className="flex justify-space-between align-center mgb-16">
                        <h2 className="inter">Professional Connections</h2>

                        <div className="modals-close-icon flex justify-center align-center">
                            <img src={icons.header.close} alt="" />
                        </div>
                    </div>

                    <div className="grid grid-column-1 gap-10">
                        {aiconnections?.map(item => (
                            <div className="flex align-center justify-space-between row view-pfc-item" key={item.name}>
                                <div className="flex row align-center gap-8">
                                    <div className="pfc-dp flex justify-center align-center">
                                        <img 
                                            src={item.name === 'AI Wellness Coach' ? images.connect.rs2 : item.name === 'AI Therapist' ? images.connect.rs1 : images.connect.rs3 } 
                                            alt="" 
                                        />
                                    </div>
                                    <div className="">
                                        <h3 className="inter">{item.name}</h3>
                                        <h4 className="inter">Last Session</h4>
                                    </div>
                                </div>
                                <div className="view-pfc-item-icon cursor-pointer" onClick={() => setpfcchatbox(item.name)}>
                                    <img src={icons.connect.comment_ot} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className={`pfc-chat-box ${pfcchatbox ? 'active' : ''}`}>
                    
                    <div className="flex row align-center mgb-16 justify-space-between">
                        <div className="flex row align-center gap-16">
                            <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={() => setpfcchatbox(null)}>
                                <img src={icons.general.arrow_left} alt="" />
                            </div>
                            <div className="flex row gap-8 align-center">
                                <div className="pfc-dp">
                                    <img 
                                        src={pfcchatbox === 'AI Wellness Coach' ? images.connect.rs2 : pfcchatbox === 'AI Therapist' ? images.connect.rs1 : images.connect.rs3 }
                                        alt=""     
                                    />
                                </div>
                                <div className="">
                                    <h2 className="inter mgb-5">{pfcchatbox ? pfcchatbox : ''}</h2>
                                    <div className="flex align-center gap-4">
                                        <div className="online-circle flex justify-center align-center"><div></div></div>
                                        <h3 className="inter">Online</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modals-close-icon flex justify-center align-center cursor-pointer">
                            <img src={icons.header.close} alt="" />
                        </div>
                    </div>

                    <div className="pfc-chat-msg-cont mgb-12">
                        <div className="pfc-chat-msg-cont-inner">
                            {messagestoshow.map((item, index) => (
                                <div className={`pfc-msg-item ${item.role === 'assistant' ? 'rosa' : ''}`} key={index}>
                                    <div className="pfc-msg-item-inner">
                                        <p className="inter">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="pfc-chat-input flex align-center gap-8">

                        <input type="text" placeholder="Message..." value={inputmessage} onChange={(e) => setInputmessage(e.target.value)} />

                        <div className={`pfc-chat-send flex justify-center align-center cursor-pointer ${loading ? 'isSending' : ''}`} onClick={handleChatting}>
                            <img src={icons.general.paper_plane} alt="" />
                        </div>

                    </div>

                </div>




                
            </div>
        </div>
    )
}


export default AddPfComp



