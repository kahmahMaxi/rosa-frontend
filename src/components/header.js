import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// states_g
import { openSidebar, closeSidebar } from './../redux/sidebarSlice';
import { openRightbar, closeRightbar } from './../redux/rightbarSlice';

// hooks
import { useWallet } from '../hooks/general/useWallet';



import dp1 from './../media/img/dp1.png'
import { icons } from "../utilities/icn";
import { images } from '../utilities/img';
import BarsDrop from './barsdrop'


const Header = () => {

    const { walletAddress, connectWallet } = useWallet()

    const showsidebar = useSelector((state) => state.showsidebar.value)
    const showrightbar = useSelector((state) => state.showrightbar.value)
    const user = useSelector((state) => state.user.value)
    const path = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

    const handleShowsidebar = () => { 
        if (windowWidth < 850) {
            dispatch(closeRightbar())
        }
        if(windowWidth < 1100) {
            if(showsidebar) {
                dispatch(closeSidebar())
            } else {
                dispatch(openSidebar())
            }
        }
    }

    const handleShowrightbar = () => {
        if(windowWidth < 850) {
            dispatch(closeSidebar())
            if(showrightbar) {
                dispatch(closeRightbar())
            } else {
                dispatch(openRightbar())
            }
        }
    }

    const formatWalletAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 4)}...${address.slice(-3)}`;
    }

    const setAlltoNull = () => {
        if(windowWidth < 850) {
            dispatch(closeRightbar())
        }
        dispatch(closeSidebar())
    }


    return (

        <div className="">

            {((windowWidth < 1100) && showsidebar) || ((windowWidth < 850) && showrightbar) ? 
                <BarsDrop dropPress={setAlltoNull} />
            : null}

            {path.pathname !== '/auth' ? <div className="main-header">
                <div className="main-header-inner flex row align-center justify-space-between">
                    <div className="">
                        {/* <h2 className='inter'>
                            <span>
                                {path.pathname === '/' ? 'Home' : path.pathname === '/wellness' ? 'Wellness' : 
                                path.pathname === '/insights' ? 'Insights' : path.pathname === '/connect' ? 'Connect' : path.pathname === '/profile' ? 'Profile' : 'Crisis' }
                            </span>
                        </h2>
                        <div className="flex row align-center">
                            <h3 className='inter'>Last activity</h3>
                            <div className="flex row align-center gap-6">
                                <h4 className="inter">{formatDateToLabel(user?.lastActivity)}</h4> <div className='la-dot'></div> <h4 className='inter'>{formatTimestamp(user?.lastActivity, 'time')}</h4>
                            </div>
                        </div> */}

                        {windowWidth < 1100 ? 
                            <div className="flex row align-center">
                                <div className="menu-bar flex justify-center align-center cursor-pointer" onClick={handleShowsidebar}>
                                    <img src={icons.header.menu_bar} alt="" />
                                </div>

                                <div className="header-logo flex row align-center">
                                    <img src={images.general.rs_logo_single_nb} alt="" />
                                    <div className="">
                                        <h2>ROSA</h2>
                                        {windowWidth > 500 ? <h3>Mental Wellness Assistant</h3> : null}
                                    </div>
                                </div>
                            </div>
                        : null}

                    </div>

                    <div className="flex row align-center gap-13">
                        {(windowWidth < 1100) && (windowWidth > 500) ? 
                            <p className='header-sos-btn inter cursor-pointer' onClick={() => navigate('/crisis')}>SOS</p>
                        : null}

                        <div className="in-bar-box flex justify-center align-center">
                            <div className="handle-rightbar-icon flex justify-center align-center cursor-pointer">
                                <img src={icons.header.bell_outline} alt="" />
                                <div className="flex align-center justify-center"><p>23</p></div>
                            </div>
                        </div>

                        {windowWidth > 500 ? 
                            <div className="connect-wallet-btn flex row align-center cursor-pointer" onClick={connectWallet}>
                                <div className="connect-icon-box">
                                    <img src={icons.home.wallet_ot} alt="" />
                                </div>
                                <p>{walletAddress ? formatWalletAddress(walletAddress) : 'Connect Wallet'}</p>
                            </div>
                        : null}

                        {windowWidth < 850 ? <div className="me-icon flex justify-center align-center cursor-pointer" onClick={handleShowrightbar}>
                            <img src={icons.header.user_ot} alt="" />
                        </div> : null}
                        {/* <div className="dp-box flex align-center justify-center cursor-pointer">
                            <img src={dp1} alt="" />
                        </div> */}
                    </div>
                </div>
            </div> : null}

        </div>

    )


}


export default Header;