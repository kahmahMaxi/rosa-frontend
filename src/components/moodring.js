

import React, { useEffect, useState } from "react";


const MoodRing = ({ moodLevel }) => {


  const totalDrops = 24;
  const targetActiveDrops = Math.round((moodLevel / 100) * totalDrops);


  const [activeCount, setActiveCount] = useState(0);
  

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > targetActiveDrops) {
        clearInterval(interval);
      } else {
        setActiveCount(current);
      }
    }, 60); // speed of animation

    return () => clearInterval(interval);
  }, [targetActiveDrops]);



  return (

    <div className="mood-ring">
      <div className="emoji">😊</div>
      {Array.from({ length: totalDrops }).map((_, i) => {
        const angle = (360 / totalDrops) * i;
        const isActive = i < activeCount;

        return (
          <div
            key={i}
            className={`drop ${isActive ? "active" : ""}`}
            style={{
                transform: `rotate(${angle}deg) translate(0, -63px) rotate(-${angle}deg)`,
                // transformOrigin: "center",
                // rotate: `${angle}deg`, // this makes the drop point inward
            }}
          />
        );
      })}
    </div>

  );
};

export default MoodRing;





