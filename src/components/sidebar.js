import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// states_g
import { openSidebar, closeSidebar } from './../redux/sidebarSlice';
import { setmodalgeneral } from './../redux/modalsSlice'

import { icons } from '../utilities/icn';
import { images } from '../utilities/img';

// components
import Sos from './sos';


const Sidebar = () => {

    const modalgeneral = useSelector((state) => state.modalgeneral.value)
    const showsidebar = useSelector((state) => state.showsidebar.value)
    const pathlocation = useLocation()
    const dispatch = useDispatch()

    const windowscrollvalue = window.scrollY
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // console.log(window.innerWidth)
        };

        const handleScroll = () => {
            // console.log(window.scrollY)
            if(windowWidth < 1100) {
                dispatch(closeSidebar())
            }
        }

        window.addEventListener('resize', handleResize);

        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    useEffect(() => {
        if(windowWidth < 1100) {
            dispatch(closeSidebar())
        } else if (windowWidth > 1100) {
            dispatch(openSidebar())
        }
    }, [windowWidth])

    const handleShowsidebar = () => { 
        if(windowWidth < 1100) {
            if(showsidebar) {
                dispatch(closeSidebar())
            } else {
                dispatch(openSidebar())
            }
        }
    }

    // const setAlltoNull = () => {
    //     setmodalgeneral(null)
    // }



    return ( 

        <div className="">

            <Sos windowWidth={windowWidth} />

            {pathlocation.pathname !== '/auth' && pathlocation.pathname !== '/' && pathlocation.pathname !== '/ring' ? <div className={`sidebar ${showsidebar ? 'active' : ''}`}>
                <div className="sidebar-top flex justify-space-between align-center">
                    <div className="sidebar-logo-cont flex row align-center">
                        <div className="tech-logo">
                            <img src={images.general.rs_logo_single_nb} alt="" />
                        </div>
                        <div className="">
                            <h2>ROSA</h2>
                            <p className='inter'>Mental Wellness Assistant</p>
                        </div>
                    </div>

                    {windowWidth < 1100 ? 
                        <div className="sidebar-close-icon flex justify-center align-center cursor-pointer" onClick={() => dispatch(closeSidebar())}>
                            <img src={icons.header.close} alt="" />
                        </div>
                    : null}

                </div>

                <div className="sidebar-links-cont">

                    
                    <Link to='dashboard' className={`sidebar-link-item flex row align-center cursor-pointer ${pathlocation.pathname === '/dashboard' ? 'active' : ''}`} onClick={handleShowsidebar}>
                        <div className="sidebar-icon-box">
                            <img src={`${pathlocation.pathname === '/dashboard' ? icons.sidebar.active.new.home : icons.sidebar.inactive.new.home}`} alt="" />
                        </div>
                        <p className="inter">Home</p>
                    </Link>

                    <Link to='wellness' className={`sidebar-link-item flex row align-center cursor-pointer ${pathlocation.pathname === '/wellness' ? 'active' : ''}`} onClick={handleShowsidebar}>
                        <div className="sidebar-icon-box">
                            <img src={`${pathlocation.pathname === '/wellness' ? icons.sidebar.active.new.heart : icons.sidebar.inactive.new.heart}`} alt="" />
                        </div>
                        <p className="inter">Wellness</p>
                    </Link>

                    <Link to='insights' className={`sidebar-link-item flex row align-center cursor-pointer ${pathlocation.pathname === '/insights' ? 'active' : ''}`} onClick={handleShowsidebar}>
                        <div className="sidebar-icon-box">
                            <img src={`${pathlocation.pathname === '/insights' ? icons.sidebar.active.new.chart : icons.sidebar.inactive.new.chart}`} alt="" />
                        </div>
                        <p className="inter">Insights</p>
                    </Link>

                    <Link to='connect' className={`sidebar-link-item flex row align-center cursor-pointer ${pathlocation.pathname === '/connect' ? 'active' : ''}`} onClick={handleShowsidebar}>
                        <div className="sidebar-icon-box">
                            <img src={`${pathlocation.pathname === '/connect' ? icons.sidebar.active.new.connect : icons.sidebar.inactive.new.connect}`} alt="" />
                        </div>
                        <p className="inter">Connect</p>
                    </Link>

                    <Link to='profile' className={`sidebar-link-item flex row align-center cursor-pointer ${pathlocation.pathname === '/profile' ? 'active' : ''}`} onClick={handleShowsidebar}>
                        <div className="sidebar-icon-box">
                            <img src={`${pathlocation.pathname === '/profile' ? icons.sidebar.active.new.user : icons.sidebar.inactive.new.user}`} alt="" />
                        </div>
                        <p className="inter">Profile</p>
                    </Link>


                </div>

                <div className="sidebar-bottom-link-cont">

                    <div className="sidebar-elipse">
                        {/* <img src={images.sidebar.bgelipse} alt="" /> */}
                    </div>

                    {/* <div className="sbl-inner"> */}
                        <div className={`sidebar-link-item-cr cursor-pointer ${pathlocation.pathname === '/crisis' ? 'active' : ''}`} 
                            onClick={() => {
                                dispatch(setmodalgeneral('sos'))
                                handleShowsidebar()
                            }}
                        >
                            <div className="flex row justify-space-between sidebar-cr-icon-box">
                                <img src={icons.sidebar.crisis_support} alt="" />
                                <img src={icons.sidebar.arrow_top_right} className='cr_arrow' alt="" />
                            </div>
                            <h2 className="inter">Instant Crisis Support</h2>
                            <h3>For emergencies</h3>
                            <p className='inter text-align-center'>SOS</p>
                        </div>
                    {/* </div> */}


                </div>

            </div> : null}

        </div>
    );
}
 
export default Sidebar;