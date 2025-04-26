
import { useState, useRef } from 'react';

export default function CustomRangeSlider() {
  const [value, setValue] = useState(3); // default value
  const sliderRef = useRef(null);

  const handleDrag = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    let newValue = ((e.clientX - rect.left) / rect.width) * 10;
    newValue = Math.max(1, Math.min(10, newValue));
    setValue(Math.round(newValue));
  };

  const handleTouch = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    let newValue = ((e.touches[0].clientX - rect.left) / rect.width) * 10;
    newValue = Math.max(1, Math.min(10, newValue));
    setValue(Math.round(newValue));
  };

  return (
    <div className='mood-answer-box input-range-box flex align-center gap-16 row'>
      
      {/* Slider track */}
      <div 
        ref={sliderRef}
        onMouseDown={(e) => {
          handleDrag(e);
          window.addEventListener('mousemove', handleDrag);
          window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', handleDrag);
          }, { once: true });
        }}
        onTouchStart={(e) => {
          handleTouch(e);
          window.addEventListener('touchmove', handleTouch);
          window.addEventListener('touchend', () => {
            window.removeEventListener('touchmove', handleTouch);
          }, { once: true });
        }}
        style={{
          flex: 1,
          height: '22px',
          borderRadius: '5px',
        //   background: 'red',
          position: 'relative',
          marginRight: '1rem',
          cursor: 'pointer',
        }}
      >
        {/* progress_track */}
        <div style={{
          height: '8px',
          width: `100%`,
          background: 'rgba(54, 63, 114, 1)',
          borderRadius: '8px',
          position: 'absolute',
          top: 5,
          left: 0,
        }} />
        {/* Progress */}
        <div style={{
          height: '8px',
          width: `${(value - 1) / 9 * 100}%`,
          background: 'rgba(238, 70, 188, 1)',
          borderRadius: '5px',
          position: 'absolute',
          top: 5,
          left: 0,
          transition: 'width 0.2s ease', // <<< ✨ Smooth progress
        }} />

        {/* Knob */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${(value - 1) / 9 * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
          transition: 'left 0.2s ease', // <<< ✨ Smooth knob
        }} />
      </div>
      
      {/* Value Display */}
      <div className='range-value-display flex align-center justify-center'>
        <h2>{value}</h2>
      </div>
    </div>
  );
}



