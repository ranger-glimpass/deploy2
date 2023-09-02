// src/Compass.js

import React, { useState, useEffect, useRef } from 'react';
import './Compass.css';
import { ReactComponent as CompassSVG } from '../assets/compass.svg';
import Direction from './Direction';



// function CompassSVG({ rotation }) {
//     return (
//       <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
//         {/* ... Rest of the SVG content ... */}
  
//         {/* Arrow or pointer. This is what you would rotate */}
//         <line x1="100" y1="100" x2="100" y2="40" 
//               stroke="red" stroke-width="4" 
//               transform={`rotate(${rotation}, 100, 100)`} />
//         <line x1="100" y1="100" x2="100" y2="160" 
//               stroke="blue" stroke-width="2" />
//       </svg>
//     );
//   }

function Compass() {
    const [alpha, setAlpha] = useState(0);
    const needleRef = useRef(null);
    const OFFSET = 0;

    const [stepCount, setStepCount] = useState(0);
const accelerometerData = useRef([]);

function lowPassFilter(data, alpha) {
    let filtered = [];
    filtered[0] = data[0];
    for(let i = 1; i < data.length; i++) {
        filtered[i] = alpha * data[i] + (1 - alpha) * filtered[i-1];
    }
    return filtered;
}
const threshold = 12;  // Adjust this value based on testing


useEffect(() => {
    const processSteps = () => {
        let data = accelerometerData.current;
        data = lowPassFilter(data, 0.9);

        let count = 0;
        for(let i = 1; i < data.length - 1; i++) {
            if(data[i] > data[i-1] && data[i] > data[i+1] && data[i] > threshold) {
                count++;
            }
        }

        setStepCount(prev => prev + count);
        accelerometerData.current = [];  // Clear the current data
    };

    const interval = setInterval(processSteps, 1000);

    return () => clearInterval(interval);
}, []);

    useEffect(() => {
        // Handler for device orientation events
        const handleMotion = (event) => {
            const ax = event.accelerationIncludingGravity.x;
            const ay = event.accelerationIncludingGravity.y;
            const az = event.accelerationIncludingGravity.z;
    
            const magnitude = Math.sqrt(ax*ax + ay*ay + az*az);
            accelerometerData.current.push(magnitude);
        };
        
        const handleOrientation = (event) => {
            const calibratedAlpha = event.alpha + OFFSET;
    setAlpha(calibratedAlpha);
        };

        // Add and remove event listeners
        window.addEventListener('deviceorientation', handleOrientation);
        window.addEventListener('devicemotion', handleMotion);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
            window.removeEventListener('devicemotion', handleMotion);
        };

    }, []);

    useEffect(() => {
        if (needleRef.current) {
            needleRef.current.style.transform = `rotate(${-45 + alpha}deg)`;
        }
        

    }, [alpha]);

    return (
        // <div>
        //     <div style={{ transform: `rotate(${alpha}deg)` }}>
        //     <CompassSVG rotation={alpha} />
        //     </div>
        //     <p>Alpha: {alpha}</p>
        // </div>

        // <div className="compass-container">
        //     {[...Array(360)].map((_, index) => (
        //         <div 
        //             key={index}
        //             style={{
        //                 position: 'absolute',
        //                 top: '50%',
        //                 left: '50%',
        //                 transform: `rotate(${index}deg) translateY(-50%)`,
        //                 fontSize: index % 30 === 0 ? '12px' : '0px'
        //             }}
        //         >
        //             {index % 30 === 0 ? index : ''}
        //         </div>
        //     ))}
        //     <div 
        //         className="compass-arrow" 
        //         style={{ transform: `translateX(-50%) rotate(${alpha}deg)` }}
        //     ></div>
        // </div>
<>
        <div className="compass-container">
            <CompassSVG className="compass-image" ref={needleRef} />
            <div className="compass-label north">N</div>
            <div className="compass-label south">S</div>
            <div className="compass-label west">W</div>
            <div className="compass-label east">E</div>
            
        alpha : {parseInt(alpha)}
        </div>
        <div className="step-counter">steps: {stepCount}</div>

        <Direction/>
        </>
    );
}

export default Compass;
