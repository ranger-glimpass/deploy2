// src/Compass.js

import React, { useState, useEffect } from 'react';


function CompassSVG({ rotation }) {
    return (
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        {/* ... Rest of the SVG content ... */}
  
        {/* Arrow or pointer. This is what you would rotate */}
        <line x1="100" y1="100" x2="100" y2="40" 
              stroke="red" stroke-width="4" 
              transform={`rotate(${rotation}, 100, 100)`} />
        <line x1="100" y1="100" x2="100" y2="160" 
              stroke="blue" stroke-width="2" />
      </svg>
    );
  }

function Compass() {
    const [alpha, setAlpha] = useState(0);

    useEffect(() => {
        // Handler for device orientation events
        const handleOrientation = (event) => {
            const { alpha } = event;
            setAlpha(alpha);
        };

        // Add and remove event listeners
        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <div>
            <div style={{ transform: `rotate(${alpha}deg)` }}>
                Compass Pointer Image Here
            </div>
            <p>Alpha: {alpha}</p>
        </div>
    );
}

export default Compass;
