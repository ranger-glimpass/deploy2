// src/Compass.js

import React, { useState, useEffect, useRef } from 'react';
import './Compass.css';
import { ReactComponent as CompassSVG } from '../assets/compass.svg';
import Direction from './Direction';


function Compass() {
    const [alpha, setAlpha] = useState(0);
    const OFFSET = 0;
    const rotatingPartRef = useRef(null); // Ref for the rotating part of the SVG
    const [isWalking, setIsWalking] = useState(false);
    //const [stepsCounted, setStepsCounted] = useState(0);
    const [alphaSum, setAlphaSum] = useState(0);
    const [alphaReadingsCounted, setAlphaReadingsCounted] = useState(0);

    const [stepCount, setStepCount] = useState(0);
    const accelerometerData = useRef([]);

    function lowPassFilter(data, alpha) {
        let filtered = [];
        filtered[0] = data[0];
        for (let i = 1; i < data.length; i++) {
            filtered[i] = alpha * data[i] + (1 - alpha) * filtered[i - 1];
        }
        return filtered;
    }
    const threshold = 12;  // Adjust this value based on testing (Steps)


    useEffect(() => {
        if (isWalking) {
            const processSteps = () => {
                let data = accelerometerData.current;
                data = lowPassFilter(data, 0.9);

                let count = 0;
                for (let i = 1; i < data.length - 1; i++) {
                    if (data[i] > data[i - 1] && data[i] > data[i + 1] && data[i] > threshold) {
                        count++;
                    }
                }
                setStepCount(prev => prev + count);
                accelerometerData.current = [];  // Clear the current data
            };
            const interval = setInterval(processSteps, 1000);
            return () => clearInterval(interval);
        }
    }, [isWalking]);


    const handleWalkingToggle = () => {
        if (isWalking) {
            // When stopping walking
            const avgAlpha = alphaSum / alphaReadingsCounted;
            window.alert(`Steps Counted: ${stepCount}\nAverage Alpha(Node is at): ${parseInt(avgAlpha)}`);
            setIsWalking(false);
            setStepCount(0);
            setAlphaSum(0);
            setAlphaReadingsCounted(0);
        } else {
            // When starting walking
            setIsWalking(true);
        }
    };


    useEffect(() => {
        // Handler for device orientation events
        const handleMotion = (event) => {
            const ax = event.accelerationIncludingGravity.x;
            const ay = event.accelerationIncludingGravity.y;
            const az = event.accelerationIncludingGravity.z;

            const magnitude = Math.sqrt(ax * ax + ay * ay + az * az);
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
        if (isWalking) {
            setAlphaSum(prevSum => prevSum + (360-alpha));
            setAlphaReadingsCounted(prevCount => prevCount + 1);
        }
    }, [alpha, isWalking]);  // Dependencies ensure this runs whenever alpha or isWalking changes



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
                Alpha : {360 - parseInt(alpha)}
            </div>
            <br></br><br></br>
            <div className="step-counter">Steps: {stepCount}</div>
            <br></br>
            {/* <Direction /> */}

            <div className="compass-container">
                <button onClick={handleWalkingToggle}>
                    {isWalking ? "Stop Walking" : "Start Walking"}
                </button>
                {/* Rest of your Compass UI */}
            </div>
        </>
    );
}

export default Compass;
