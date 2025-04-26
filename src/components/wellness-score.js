

import React, { useEffect, useState } from "react";
// import "./WellnessScore.css";



const WellnessScore = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(score / 30); // animation speed
    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="wellness-container">
        <div className="wn-score-cont">
            <div className="wn-score-no side-score left">{score - 1}</div>
            <div className="wn-score-no main-score">{displayScore}</div>
            <div className="wn-score-no side-score right">{score + 1}</div>
        </div>

      <div className="bar-wave">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`bar bar-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default WellnessScore;




