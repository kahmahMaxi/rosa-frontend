import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';


import chat from './../media/icons/chat.png'
import file from './../media/icons/file.png'
import git from './../media/icons/git.png'
import { Vortex } from "../components/vortex";
import { images } from "../utilities/img";
import { icons } from "../utilities/icn";



const WebPage = () => {

    // const womItems = [ {fileLink: ra1, classname: 'rh1', songname: 'All in Love Is Fair'},{fileLink: ra2, classname: 'rh2', songname: 'Bedshaped (Cosi)'},
    //     {fileLink: ra3, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra4, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra5, classname: 'rh1', songname: 'All in Love Is Fair'},{fileLink: ra6, classname: 'rh2', songname: 'Bedshaped (Cosi)'},
    //     {fileLink: ra7, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra8, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra9, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra10, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra11, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra12, classname: 'rh4', songname: 'Tu sei'},
    // ]

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [pause, setPause] = useState(false);
    const containerRef = useRef(null);

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

    // useEffect(() => {
    //     const container = containerRef.current;
    //     let scrollInterval;
    
    //     const startScrolling = () => {
    //       scrollInterval = setInterval(() => {
    //         if (!pause) {
    //           container.scrollLeft += 1;
    //           if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
    //             container.scrollLeft = 0; // reset to the beginning
    //           } else {
    //             container.scrollLeft += 1; // Continue scrolling
    //           }
    //         }
    //       }, 20);
    //     };

    //     startScrolling();

    //     return () => clearInterval(scrollInterval);
    // }, [pause]);

//   const copyToClipboard = () => {
//     navigator.clipboard
//       .writeText(textca)
//       .then(() => {
//         alert("ca copied to clipboard!");
//       })
//       .catch((err) => {
//         console.error("Failed to copy ca: ", err);
//       });
//   };



    return ( 
        <div className="">

            <section id="home" className="home">
                <Vortex
                    backgroundColor="black"
                    className="home-vortex"
                >

                    <div className="home-frame">
                        

                        <div className="flex row justify-space-between align-center mgb-80">
                            <div className="flex row aligm-center gap-13">
                                <img src={images.general.new_rosa_logo_single} className="rs_logo_single" alt="" />

                                <div className="">
                                    <img src={images.general.rosa_text} className="rs_text_img mgb-5" alt="" />
                                    <h5 className="inter">Mental Wellness Assistant</h5>
                                </div>
                            </div>

                            {windowWidth > 500 ? <div className="flex row gap-12">
                                <Link to="http://gitbook.neurosa.io" target="_blank" className="home-head-btn flex row gap-10 cursor-pointer">
                                    <img src={icons.webpage.file} alt="" />
                                    <h3 className="inter">Whitepaper</h3>
                                </Link>
                                <Link to="https://github.com/Rosa-Health/" target="_blank" className="home-head-btn flex row gap-10 cursor-pointer">
                                    <img src={icons.webpage.git} alt="" />
                                    <h3 className="inter">GitHub</h3>
                                </Link>
                            </div> : null}
                        </div>

                        <div className={`${windowWidth < 500 ? 'mgb-50' : 'mgb-70'} home-title-cont`}>
                            <div className="home-title-box">
                                <h1 className="inter mgb-25">
                                    Experience the future of mental health support with Rosa, your health Al companion.
                                </h1>
                                <Link to="/auth" className="home-enter-btn cursor-pointer">
                                    <h3 className="inter">Get Started</h3>
                                </Link>
                            </div>
                        </div>

                        {windowWidth < 500 ? <div className="flex row gap-12 mgb-32">
                            <Link to="http://gitbook.neurosa.io" target="_blank" className="home-head-btn flex row gap-10 cursor-pointer">
                                <img src={icons.webpage.file} alt="" />
                                <h3 className="inter">Whitepaper</h3>
                            </Link>
                            <Link to="https://github.com/Rosa-Health/" target="_blank" className="home-head-btn flex row gap-10 cursor-pointer">
                                <img src={icons.webpage.git} alt="" />
                                <h3 className="inter">GitHub</h3>
                            </Link>
                        </div> : null}

                        <div className="flex row wrap align-flex-end justify-space-between">
                            <div className={`ring-display-container flex ${windowWidth < 500 ? 'align-flex-start' : 'align-flex-end'}`}>
                                <div className="ring-display-box">
                                    <h2 className="inter mgb-5">Get your ROSA RING</h2>
                                    <h4 className="inter mgb-20 wt_sub_title">Track your mental and health easy and stylish</h4>
                                    <Link to="https://youtu.be/8KldCljbBH0" target="_blank" className="watch-trailer-btn flex row align-center gap-13 cursor-pointer">
                                        <img src={icons.crisis.play}  alt="" />
                                        <h3 className="inter">Watch trailer</h3>
                                    </Link>
                                </div>

                                <img src={images.web_page.rs_ring} className="rs_ring" alt="" />
                            </div>

                            <div className={`grid ${windowWidth < 500 ? 'grid-column-1' : 'grid-column-2'} row grid-column-gap-40 grid-row-gap-45 rs-features-container`}>
                                <div className={`rs-feature-item ${windowWidth < 500 ? 'flex row align-center gap-16' : ''}`}>
                                    <div className="rs-features-icon-box mgb-16 flex justify-center align-center">
                                        <img src={icons.webpage.clock_rotate} alt="" />
                                    </div>
                                    <div className="">
                                        <h2 className="inter mgb-5">24/7 Support</h2>
                                        <h4 className="inter">Always here when you need someone to talk to</h4>
                                    </div>
                                </div>

                                <div className={`rs-feature-item ${windowWidth < 500 ? 'flex row align-center gap-16' : ''}`}>
                                    <div className="rs-features-icon-box mgb-16 flex justify-center align-center">
                                        <img src={icons.webpage.shield_check} alt="" />
                                    </div>
                                    <div className="">
                                        <h2 className="inter mgb-5">Private</h2>
                                        <h4 className="inter">Secure and confidential conversations</h4>
                                    </div>
                                </div>

                                <div className={`rs-feature-item ${windowWidth < 500 ? 'flex row align-center gap-16' : ''}`}>
                                    <div className="rs-features-icon-box mgb-16 flex justify-center align-center">
                                        <img src={icons.webpage.stars} alt="" />
                                    </div>
                                    <div className="">
                                        <h2 className="inter mgb-5">AI Powered</h2>
                                        <h4 className="inter">Advanced language model trained for mental health</h4>
                                    </div>
                                </div>

                                <div className={`rs-feature-item ${windowWidth < 500 ? 'flex row align-center gap-16' : ''}`}>
                                    <div className="rs-features-icon-box mgb-16 flex justify-center align-center">
                                        <img src={icons.webpage.clipboard} alt="" />
                                    </div>
                                    <div className="">
                                        <h2 className="inter mgb-5">Accessible</h2>
                                        <h4 className="inter">Available on any device via the website and mobile app</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </Vortex>
            </section>

            

            {/* <section className="wom" id="wom">
                <div className="main-frame">
                    <div className="cs-header">
                        <h2>The ROSA App</h2>
                    </div>
                    <div
                        className="cards-container"
                        ref={containerRef}
                        onMouseEnter={() => setPause(true)}
                        onMouseLeave={() => setPause(false)}
                    >
                        {womItems ? womItems.map((womItem, index) => (
                            <div key={index} className={`card cursor-pointer`}>
                                <div className="wom-image-box">
                                    <img src={womItem.fileLink} alt="" />
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
            </section> */}

        </div>
    );
}
 
export default WebPage;