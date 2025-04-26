

import React, { useState, useEffect } from 'react';


const SegmentBar = ({ percentage = 80, segments = 20 }) => {

    const [filledCount, setFilledCount] = useState(0)

    useEffect(() => {
        // Animate filling after mount
        const timeout = setTimeout(() => {
        const count = Math.round((percentage / 100) * segments);
        setFilledCount(count);
        }, 200); // delay before animation starts

        return () => clearTimeout(timeout);
    }, [percentage, segments]);

    const bars = [];
    for (let i = 0; i < segments; i++) {
        bars.push(
        <div
            key={i}
            className={`ws-bar-segment ${i < filledCount ? 'filled' : ''}`}
            style={{ animationDelay: `${i * 30}ms` }}
        ></div>
        );
    }

    return (
        <div className="week-score-bar-cont">                        
            {bars.reverse()}
        </div>
        
        
    );

};

export default SegmentBar;
