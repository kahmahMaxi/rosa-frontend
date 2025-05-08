import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';


import chat from './../media/icons/chat.png'
import file from './../media/icons/file.png'
import git from './../media/icons/git.png'
import { Vortex } from "../components/vortex";
import { images } from "../utilities/img";
import { icons } from "../utilities/icn";



const Ring = () => {

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



    return ( 
        <div className="">

            <section id="home" className="home">
                <Vortex
                    backgroundColor="black"
                    className="home-vortex"
                >
                    <div className="flex row justify-space-between align-center ring-frame-header">
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

                    <div className={`home-frame ring`}> 
 
                        <div className="flex row wrap align-flex-end gap-190 mgb-30 ring-page-top">

                            <div className="ring-frame-1">
                                <div className={` home-title-cont ${windowWidth < 900 ? 'mgb-50' : 'mgb-130'}`}>
                                    <div className="home-title-box">
                                        <h1 className="inter mgb-10">
                                            Rosa Mobile App
                                        </h1>
                                        <h6 className="inter mgb-25">Your Personal Health Companion</h6>
                                        <div className="flex row gap-16">
                                            <a href="" target="_blank" className="app-btn ">
                                                <img src={images.web_page.g_play_badge} alt="" />
                                            </a>
                                            <a href="" target="_blank" className="app-btn ">
                                                <img src={images.web_page.app_store_badge} alt="" />
                                            </a>
                                        </div>
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

                                <div className="meet-rosa-box flex row gap-20">
                                    <div className="">
                                        <h2 className="inter mgb-8">Meet the ROSA mobile app</h2>
                                        <h4 className="inter">Take a quick tour of top features</h4>
                                    </div>
                                    <Link to="https://youtu.be/xu1Yje2_ZvI" target="_blank">
                                        <img src={images.web_page.trailer_img} alt="" />
                                    </Link>
                                </div>
                            </div>

                            <div className="ring-frame-2 position-relative">
                                <div className="flex row wrap align-flex-end">
                                    <div className="mobile-app-demo-img">
                                        <img src={images.web_page.mobile_app_demo} alt="" />
                                    </div>
                                    <div className="rs_work_text mgb-30">
                                        <h2 className="inter mgb-16">Works perfect with the Rosa Smart Ring</h2>
                                        <Link to="https://forms.gle/78a1cbxMZJwbbPM86" target="_blank" className="flex row align-center gap-10 home-enter-btn cursor-pointer">
                                            <img src={icons.webpage.cart} alt="" />
                                            <h3 className="inter">Pre-order now</h3>
                                        </Link>
                                    </div>
                                    <img src={images.web_page.rs_ring} className="ring_frame_ring" />
                                </div>
                            </div>

                        </div>

                        <div className="rosa-info-item-container">

                            <div className={`flex row wrap ${windowWidth < 720 ? 'justify-center' : 'justify-space-between'} align-center mgb-80`}>

                                <div className="rosa-info-item">
                                    <div className="flex justify-center">
                                        <img src={images.web_page.drop_ring} className="" alt="" />
                                    </div>
                                    <h2 className="inter mgb-10 text-align-center">Your Health, Managed with Confidence</h2>
                                    <h3 className="inter text-align-center">
                                        Rosa is your all-in-one digital health assistant, powered by advanced AI. Stay on top of medications, appointments, daily habits, and overall wellness with ease.
                                    </h3>
                                </div>
                                <div className="rosa-info-item">
                                    <div className="flex justify-center">
                                        <img src={images.general.rs_logo_glow} className="" alt="" />
                                    </div>
                                    <h2 className="inter mgb-10 text-align-center">Personalized Support, 24/7</h2>
                                    <h3 className="inter text-align-center">
                                        Rosa offers natural conversations to help you track symptoms, manage your treatment plan, and build healthier routines. Always there to guide you on your wellness journey.
                                    </h3>
                                </div>
                                <div className="rosa-info-item">
                                    <div className="flex justify-center">
                                        <img src={images.web_page.rings} className="" alt="" />
                                    </div>
                                    <h2 className="inter mgb-10 text-align-center">Seamless Integration with the Rosa Smart Ring</h2>
                                    <h3 className="inter text-align-center">
                                        Get real-time insights into your health metrics, including sleep, heart rate, and activity levels, all through a clean and intuitive dashboard.
                                    </h3>
                                </div>

                            </div>

                            <div className={`flex row wrap justify-center align-center ${windowWidth > 720 ? 'gap-100' : ''}`}>
                                <div className="rosa-info-item">
                                    <div className="flex justify-center">
                                        <img src={images.web_page.dp_shadow} className="" alt="" />
                                    </div>
                                    <h2 className="inter mgb-10 text-align-center">Privacy, Simplicity, Care</h2>
                                    <h3 className="inter text-align-center">
                                        Designed with your privacy in mind, Rosa puts your health first. Simple, effective, and empowering—you’re in control of your health anytime, anywhere.
                                    </h3>
                                </div>
                                <div className="rosa-info-item">
                                    <div className="flex justify-center">
                                        <img src={images.web_page.event} className="" alt="" />
                                    </div>
                                    <h2 className="inter mgb-10 text-align-center">A Healthcare Assistant in Your Pocket</h2>
                                    <h3 className="inter text-align-center">
                                        With Rosa, you’ll always have a smart, supportive health assistant wherever you go. It’s like having your own personal healthcare guide right in your pocket.
                                    </h3>
                                </div>
                            </div>

                        </div>


                    </div>


                </Vortex>
            </section>

            {/* <section className="rosa-infos" id="rosa-infos">
                
            </section> */}

            

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
 
export default Ring;