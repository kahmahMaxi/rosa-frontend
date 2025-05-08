import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// states_g
import { openRightbar, closeRightbar } from './../redux/rightbarSlice';
import { openosModal, closeosModal } from './../redux/osSlice';



import { icons } from "../utilities/icn";
import { images } from "../utilities/img";

// components
import BackDrop from './backdrop';
import OpenSchedule from './openschedule';








const RightBar = () => {


    const pathlocation = useLocation()
    const showrightbar = useSelector((state) => state.showrightbar.value)
    const user = useSelector((state) => state.user.value)
    const osmodal = useSelector((state) => state.osmodal.value)
    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [userSchedules, setuserschedules] = useState(null)


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // console.log(window.innerWidth)
        };

        const handleScroll = () => {
            // console.log(window.scrollY)
            if(windowWidth < 850) {
                dispatch(closeRightbar())
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
        if(windowWidth < 850) {
            dispatch(closeRightbar())
        } else if (windowWidth > 850) {
            dispatch(openRightbar())
        }
    }, [windowWidth])


    function formatTimestamp(timestamp, returnValue) {
        const date = new Date(timestamp);
      
        const now = new Date();
        const isToday =
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
      
        const timeOptions = {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        };
        const timeStr = date.toLocaleTimeString(undefined, timeOptions); // e.g., 9:20 AM
      
        if(returnValue === 'time') {
            return timeStr
        } else if (returnValue === 'date') {
            if (isToday) {
              return `Today`;
            } else {
              const dateOptions = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              };
              const dateStr = date.toLocaleDateString(undefined, dateOptions); // e.g., Mar 16, 2024
              return `${dateStr}`;
            }
        }
    }
    function getTimeLeftMessage(timestamp) {
        const now = Date.now();
        const diff = timestamp - now;
      
        if (diff <= 0) return "Time passed";
      
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
      
        if (hours > 0 && remainingMinutes > 0) {
            return `${hours} hour`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""}`;
        } else {
            return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
        }
        // if (hours > 0 && remainingMinutes > 0) {
        //   return `${hours}h ${remainingMinutes}m left`;
        // } else if (hours > 0) {
        //   return `${hours} hour${hours > 1 ? "s" : ""} left`;
        // } else {
        //   return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""} left`;
        // }
      }
      


    function isUpcomingToday(timestamp) {
        const now = new Date();
        const logDate = new Date(timestamp);
      
        // Check if it's today
        const isSameDay =
          logDate.getFullYear() === now.getFullYear() &&
          logDate.getMonth() === now.getMonth() &&
          logDate.getDate() === now.getDate();
      
        return isSameDay;
    }
    function isUpcomingFuture(timestamp) {
        const now = new Date();
        const logDate = new Date(timestamp);

        const isToday = logDate.toDateString() === now.toDateString(); // Checks if it's today

        const isFuture = timestamp > now.getTime(); // Checks if it's in the future

        return isFuture;
    }

    const handleUserschedules = () => {
        if(user) {
            if(user.schedules) {
                const upcomingToday = user.schedules.filter(schedule => isUpcomingToday(schedule.date))
                const upcomingFuture = user.schedules.filter(schedule => isUpcomingFuture(schedule.date))
                const upcomingSchedules = [...upcomingToday, ...upcomingFuture]
                // console.log(upcomingSchedules)
                setuserschedules(upcomingSchedules)
            }
        }
    }

    const handlepws = (value) => {
        const filter = value.filter(item => item.name === 'AI Post Workout Sessions' && (isUpcomingFuture(item.date) || isUpcomingToday(item.date)))
        return filter
    }

    useEffect(() => {

        handleUserschedules();
        const interval = setInterval(handleUserschedules, 5 * 60 * 1000); // Check every 5 min
        return () => clearInterval(interval);

    }, [])

    useEffect(() => {

        handleUserschedules();

    }, [user])

    

    const setAlltoNull = () => {
        dispatch(closeosModal())
    }



    return (  

        <div className="">

            {osmodal ? 
                <BackDrop dropPress={setAlltoNull} />
             : null}

            <OpenSchedule showSchedule={osmodal} />

            {pathlocation.pathname !== '/auth' && pathlocation.pathname !== '/' && pathlocation.pathname !== '/ring' ? <div className={`rightbar ${showrightbar ? 'active' : ''}`}>

                <div className="rightbar-inner">

                    {windowWidth < 850 ? <div className="me-row flex justify-space-between align-center">
                        <h6 className='inter'>Me</h6>

                        <div className="me-close flex justify-center align-center cursor-pointer" onClick={() => dispatch(closeRightbar())}>
                            <img src={icons.header.close} alt="" />
                        </div>
                    </div> : null}


                    <div className="email-box flex align-center row">
                        <div className="eb-image">
                            <img src={images.general.dp2} alt="" />
                        </div>

                        <div className="">
                            <h2 className='inter'>{user?.useremail}</h2>
                            <div className="flex row align-center gap-5">
                                <div className="core-box flex justify-center align-center">
                                    <span className='inter'>{user?.chatno || 0}</span>
                                </div>
                                <h3 className="inter">Cores ⚡</h3>
                            </div>
                        </div>
                    </div>

                    <div className="phy-info-row grid row grid-column-3">
                        <div className="phy-info-item">
                            <h2 className="text-align-center inter">{user?.physical_info ? user.physical_info.bloodgroup : '_'}</h2>
                            <h3 className="text-align-center inter">Blood</h3>
                        </div>
                        <div className="phy-info-item">
                            <h2 className="text-align-center inter">{user?.physical_info ? user.physical_info.height : '_'}</h2>
                            <h3 className="text-align-center inter">Height</h3>
                        </div>
                        <div className="phy-info-item">
                            <h2 className="text-align-center inter">{user?.physical_info ? user.physical_info.weight : '_'}</h2>
                            <h3 className="text-align-center inter">Weight</h3>
                        </div>
                    </div>

                    <div className="events-box">
                        <h2>Upcoming Events</h2>

                        <div className="events-scroll-cont">
                            {userSchedules ? userSchedules.map((item, index) => (
                                <div className="events-box-item flex justify-space-between align-center" key={index}>
                                    <div className="">
                                        <h3 className='inter'>{item.name}</h3>
                                        <h4 className={`inter ${formatTimestamp(item.date, 'date') === 'Today' ? 'green' : ''}`}>
                                            {formatTimestamp(item.date, 'time')} <span className='inter'>{formatTimestamp(item.date, 'date')}</span>
                                        </h4>
                                    </div>
                                    <div className="event-icon">
                                        <img src={icons.rightbar.briefcase} alt="" />
                                    </div>
                                </div>
                            )) : null}
                        </div>

                        <div className="open-event-btn flex justify-center align-center cursor-pointer" 
                            onClick={() => dispatch(openosModal())}
                        >
                            <p>Add schedule</p>
                            <img src={icons.rightbar.plus_p} alt="" />
                        </div>
                    </div>

                    <div className="new-pws-box">
                        <h2 className='inter'>Post Workout Sessions</h2>

                        {user?.schedules ? (handlepws(user.schedules)).map((item, index) => (
                            <div className="new-pws-item flex justify-space-between align-center" key={index}>
                                <div className="">
                                    <h3 className="inter">Meditation</h3>
                                    <h4 className="inter">{formatTimestamp(item.date, 'time')} <span className='inter'>{getTimeLeftMessage(item.date)}</span></h4>
                                    <h5 className="inter">Coach <span className="inter">Rosa AI Coach</span></h5>
                                </div>
                                <img src={icons.rightbar.spa_3d} alt="" />
                            </div>
                        )) : null}
                    </div>


                </div>
                

            </div> : null}

        </div>

    );
}
 
export default RightBar;