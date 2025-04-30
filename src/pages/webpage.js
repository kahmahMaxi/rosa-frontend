import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';


import chat from './../media/icons/chat.png'
import file from './../media/icons/file.png'
import git from './../media/icons/git.png'



const WebPage = () => {

    // const womItems = [ {fileLink: ra1, classname: 'rh1', songname: 'All in Love Is Fair'},{fileLink: ra2, classname: 'rh2', songname: 'Bedshaped (Cosi)'},
    //     {fileLink: ra3, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra4, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra5, classname: 'rh1', songname: 'All in Love Is Fair'},{fileLink: ra6, classname: 'rh2', songname: 'Bedshaped (Cosi)'},
    //     {fileLink: ra7, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra8, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra9, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra10, classname: 'rh4', songname: 'Tu sei'},
    //     {fileLink: ra11, classname: 'rh3', songname: 'Mi troverai sempre qui'},{fileLink: ra12, classname: 'rh4', songname: 'Tu sei'},
    // ]

    const [textca, setTextca] = useState("A5qoJwvYZMRYhQFYSczRduvc9VwWAXYSYnH4wVxUVRCs");

    const [pause, setPause] = useState(false);
    const containerRef = useRef(null);

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

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textca)
      .then(() => {
        alert("ca copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy ca: ", err);
      });
  };



    return ( 
        <div className="">

            <section id="home" className="home">
                <div className="home-frame flex justify-center align-center">
                    <div className="flex row wrap align-center home-frame-inner">

                        <div className="home-text flex">
                            <div className="home-text-inner">
                                <div className="home-head-subhead">
                                    <h1>
                                        Welcome, meet <br />
                                        <span>Rosa</span>
                                    </h1>
                                    <h3>Experience the future of mental health support with Rosa, your health AI companion.</h3>
                                </div>

                                <div className="flex row wrap gap-15 hm-btn-cont">
                                    <Link to="auth" target="_blank" className='flex justify-center align-center btn-1 active'>
                                        {/* <img src={chat} alt="" /> */}
                                        <span>Enter</span>
                                    </Link>
                                    <a href="https://gitbook.neurosa.io/" target="_blank" className='flex justify-center align-center btn-1'>
                                        <img src={file} alt="" />
                                        <span>Whitepaper</span>
                                    </a>
                                    <a href="https://github.com/Rosa-Health/" target="_blank" className='flex justify-center align-center btn-1'>
                                        <img src={git} alt="" />
                                        <span>Github</span>
                                    </a>
                                </div>
                                
                            </div>
                        </div>

                        <div className="home-img">
                            <div className="grid grid-column-2 gap-30 ft-item-cont">
                                <div className="ft-item flex align-center">
                                    <div className="">
                                        <h2>24/7 Support</h2>
                                        <p>Always here when you need someone to talk to</p>
                                    </div>
                                </div>
                                <div className="ft-item flex align-center aqua">
                                    <div className="">
                                        <h2>AI Powered</h2>
                                        <p>Advanced language model trained for mental health</p>
                                    </div>
                                </div>
                                <div className="ft-item flex align-center">
                                    <div className="">
                                        <h2>Private</h2>
                                        <p>Secure and confidential conversations</p>
                                    </div>
                                </div>
                                <div className="ft-item flex align-center aqua">
                                    <div className="">
                                        <h2>Accessible</h2>
                                        <p>Available on any device via the website and mobile app</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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