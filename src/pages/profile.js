
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { icons } from "../utilities/icn";
import { images } from "../utilities/img";

// components
import BackDrop from "../components/backdrop";

// states_g
import { setmodalgeneral } from "../redux/modalsSlice";
import { setgtMessage } from "../redux/gtmsgSlice";
import { gtError } from "../redux/gtstatusSlice";

// hooks
import { useAppuserout } from "../hooks/general/useAppuserout";
import { useWallet } from '../hooks/general/useWallet';

import { transferRosaTokens } from "../utilities/transferToken";
import { setUser } from "../redux/userSlice";




const Profile = () => {

    const { checkAppUser } = useAppuserout()
    const { walletAddress, connectWallet } = useWallet()

    const user = useSelector((state) => state.user.value)
    const modalgeneral = useSelector((state) => state.modalgeneral.value)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [dataSharing, setDatasharing] = useState(null)

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

    const handleDataSharing = () => {
        if(!dataSharing) {
            setDatasharing(true)
        } else {
            setDatasharing(false)
        }
    }

    const handleTransferToken = async () => {
        if(walletAddress) {
            const response = await transferRosaTokens(
                walletAddress,  // your connected wallet
                'w4JpjVWzKMQ7GuMRnM7BVxLRN7eWyQnKNNdnQ5jHzDm',   // wallet address to send tokens to
                5 * 10 ** 6, // if 6 decimals
                '6dZiYn3DTdPeBiWu5FbpbdyMXMwi47KQpddZnmZkpump' // your $ROSA token address from pump.fun
            );
            console.log(response)
        } else {
            dispatch(gtError())
            dispatch(setgtMessage('connect wallet first'))
            connectWallet()
        }
          
    }

    const handleLogout = () => {
        // localStorage.removeItem('your_key_name')
        localStorage.clear()
        dispatch(setUser(null))
        navigate('/auth')
    }

    const setAlltoNull = () => {
        dispatch(setmodalgeneral(null))
    }

    return (  

        <div className="profile">

            {modalgeneral ?
                <BackDrop dropPress={setAlltoNull} />
            : null}

            <div className="mgb-24 premium-level-box flex justify-space-between align-center">
                <div className={`flex align-center ${windowWidth > 500 ? 'gap-16' : 'gap-7'}`}>
                    <img src={icons.profile.crown_3d} alt="" />
                    <div className="">
                        <h3 className="inter mgb-10">Subscription Level</h3>
                        <h2 className="inter mgb-5">Premium</h2>
                        <h4 className="inter">Member since <span className="inter">Oct 2024</span></h4>
                    </div>
                </div>

                <h5 className="inter cursor-pointer" onClick={handleTransferToken}>Upgrade</h5>
            </div>

            <div className={`mgb-32 grid ${windowWidth > 500 ? 'grid-column-2' : 'grid-column-1'} row gap-24`}>
                <div className="profile-frames flex align-center justify-space-between">
                    <div className="">
                        <h2 className="inter mgb-7">Connected devices</h2>
                        <h3 className="inter">0 devices</h3>
                    </div>
                    <div className=""></div>
                </div>

                <div className="profile-frames flex align-center justify-space-between">
                    <h2 className="inter">Share Health Data</h2>
                    <div className={`toggle-icon cursor-pointer ${dataSharing ? 'active' : ''}`} onClick={handleDataSharing}><div></div></div>
                </div>
            </div>

            <div className="profile-frame-outer mgb-24">
                <h1 className="inter mgb-24">Account Settings</h1>

                <div className="grid grid-column-1 gap-12">

                    <div className="profile-frames flex justify-space-between align-center">
                        <div className={`flex row align-center ${windowWidth > 500 ? 'gap-16' : 'gap-6'}`}>
                            <div className="icon-right flex justify-center align-center">
                                <img src={icons.profile.shield_p} alt="" />
                            </div>
                            <div className="">
                                <h2 className="inter mgb-5">Privacy Controls</h2>
                                <h3 className="inter">Manage your data Privacy</h3>
                            </div>
                        </div>

                        <div className="icon-angle">
                            <img src={icons.general.angle_right} alt="" />
                        </div>
                    </div>

                    <div className="profile-frames flex justify-space-between align-center">
                        <div className={`flex row align-center ${windowWidth > 500 ? 'gap-16' : 'gap-6'}`}>
                            <div className="icon-right flex justify-center align-center">
                                <img src={icons.profile.bell_p} alt="" />
                            </div>
                            <div className="">
                                <h2 className="inter mgb-5">Notification Preferences</h2>
                                <h3 className="inter">Control how and when you receive alerts</h3>
                            </div>
                        </div>

                        <div className="icon-angle">
                            <img src={icons.general.angle_right} alt="" />
                        </div>
                    </div>

                    <div className="profile-frames flex justify-space-between align-center">
                        <div className={`flex row align-center ${windowWidth > 500 ? 'gap-16' : 'gap-6'}`}>
                            <div className="icon-right flex justify-center align-center">
                                <img src={icons.profile.bars_p} alt="" />
                            </div>
                            <div className="">
                                <h2 className="inter mgb-5">Data Management</h2>
                                <h3 className="inter">Export or delete your personal data</h3>
                            </div>
                        </div>

                        <div className="icon-angle">
                            <img src={icons.general.angle_right} alt="" />
                        </div>
                    </div>

                    <div className="profile-frames flex justify-space-between align-center">
                        <div className={`flex row align-center ${windowWidth > 500 ? 'gap-16' : 'gap-6'}`}>
                            <div className="icon-right flex justify-center align-center">
                                <img src={icons.profile.link} alt="" />
                            </div>
                            <div className="">
                                <h2 className="inter mgb-5">Integration Settings</h2>
                                <h3 className="inter">Connect with other health apps and services</h3>
                            </div>
                        </div>

                        <div className="icon-angle">
                            <img src={icons.general.angle_right} alt="" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="logout-btn flex justify-flex-end cursor-pointer" onClick={handleLogout}>
                <p className="inter">Logout</p>
            </div>

        </div>

    );
}
 
export default Profile;