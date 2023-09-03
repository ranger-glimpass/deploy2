// src/Compass.js

import React, { useState, useEffect, useRef } from 'react';
import './Compass.css';
import { ReactComponent as CompassSVG } from '../assets/compass.svg';
//import { ReactComponent as Arrow } from '../assets/navigationArrow.svg';
import Direction from './Direction';


function Compass() {
    const [alpha, setAlpha] = useState(0);
  //  const needleRef = useRef(null);
    const OFFSET = 0;
    const rotatingPartRef = useRef(null); // Ref for the rotating part of the SVG


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
        if (rotatingPartRef.current) {
            rotatingPartRef.current.style.transform = `rotate(-${360 - alpha}deg)`;
        }

    }, [alpha]);

    return (
       
<>
        <div className="compass-container">
            <p>↓</p>
            <CompassSVG className="compass-image" ref={rotatingPartRef} />
        alpha : {360 - parseInt(alpha)}
        </div>
        <br></br><br></br>
        <div className="step-counter">steps: {stepCount}</div>
<br></br>
        <Direction/>
        </>
    );
}

export default Compass;
