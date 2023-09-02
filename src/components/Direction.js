import React, { useEffect, useState, useRef } from "react";


  //Speed calculation initialization
//   let v_previous = 0; // Initial velocity (m/s)
// let last_time = Date.now(); // Returns the current time in milliseconds
// const dragFactor = 0.05; // Adjust this value based on your requirements
// const highDragFactor = 0.5; // Drag factor when acceleration is very low
// const accelThreshold = 0.1; // Acceleration below which is considered very low
// const negligibleAccel = 1e-1; // Acceleration below this is treated as zero.


const Direction = () => {
  const [directionData, setDirectionData] = useState({});
  const [accelerationData, setAccelerationData] = useState({});
  const [accXY, setAccXY] = useState({});
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [final_speed, setFinalSpeed] = useState(0);
  const [dist, setDist] = useState(0);

  //datapoint setter
  const [samplePoint, setDatapoint] = useState(0);
  const [deg, setDegree] = useState("Degree");

  const dirRef = useRef();
  const accRef = useRef();
  const totalAccX = useRef(0);
  const totalAccY = useRef(0);
  const overTime = useRef(0);
  const timeRef = useRef(new Date());
  const distRef = useRef(0);
  const handleOrientation = (event) => {
    dirRef.current = event;
    // Do stuff with the new orientation data
  };
  
  
  //for datapoint 
  var datapoint = 0;
  var degree = "Degree";
//changes for speed
const initial_a = useRef(0);
const intial_speed = useRef(0); 
const final_s = useRef(0); 
const d = useRef(0); 

  const handleMotion = (event) => {
    
    accRef.current = event.acceleration;
    totalAccX.current += parseInt(event.acceleration.x);
    totalAccY.current += parseInt(event.acceleration.y);
    overTime.current++;
    const currTime = new Date();
    //milliseconds to second
    const timeInterval = (currTime - timeRef.current)/1000;
    distRef.current += parseInt(event.acceleration.x) * timeInterval;
    setDistance(distRef.current);
    // Do stuff with the new orientation data
    setDirectionData(dirRef.current);

    datapoint++;

    //Calculating speed and distance
    const a_magnitude = Math.sqrt(parseFloat(event.acceleration.x) * parseFloat(event.acceleration.x) + parseFloat(event.acceleration.y) * parseFloat(event.acceleration.y));
      final_s.current += a_magnitude/60; 
      
      if(a_magnitude<0.1 || final_s.current < 0.1){
        final_s.current = 0;
        setFinalSpeed(0.00);
      }
      d.current += final_s.current/60;
    // intial_speed.current = final_s.current;
    // initial_a.current = parseFloat(event.acceleration.x);
    // timeRef.current=currTime;
    
    setFinalSpeed(final_s.current.toFixed(2));
    
    
    setDist(d.current.toFixed(2));


    //degree name
    // const direction = parseInt(directionData.alpha);
    // if(direction >= 0 && direction <=45){
    //   setDegree("North");
    // }
    // else if(direction >=46 && direction <=120){
    //   setDegree("West");
    // }
    // else if(direction >=121 && direction <=225){
    //   setDegree("South");
    // }
    // else{
    //   setDegree(direction);
    // }
    
  };

  useEffect(() => {
    setInterval(() => {

      // setDirectionData(dirRef.current);
      setAccelerationData(accRef.current);
      totalAccX.current = totalAccX.current / overTime.current;
      totalAccY.current = totalAccY.current / overTime.current;
      setAccXY({
        x: totalAccX.current,
        y: totalAccY.current,
        time: overTime.current,
      });
      overTime.current = 1;
      totalAccX.current = 0;
      totalAccY.current = 0;

      setDatapoint(datapoint);
      datapoint = 0;
    }, 1000);
  }, []);



  

  
  useEffect(() => {
   
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("devicemotion", handleMotion, true);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
      window.removeEventListener("devicemotion", handleMotion, true);
    };
  }, []);

  return (
    
    <>
      <div className="device-orientation-container">
        <div>
          <span>direction: </span>
          {parseInt(directionData.alpha)} {deg}
        </div>
      </div>
      <div className="device-speed-container">
        <div>
          <span>Speed: </span>
          {final_speed} m/s
        </div>
      </div>
      <div className="device-dist-container">
        <div>
          <span>distance: </span>
          {dist} meters
        </div>
      </div>
      <div className="device-datapoint-container">
        <div>
          <span>datapoint: </span>
          {samplePoint} / second
        </div>
      </div>
{/* 
      <div className="device-speed-container">
        <div>
          <span>Speed from Chatgpt: </span>
          {parseInt(speed)} m/s
        </div>
      </div>
       */}

      {/* <div className="device-acceleration-container">
        <div>
          <span>acc along x-axis: </span>
          {accelerationData.x}
        </div>
        <div>
          <span>acc along y axis: </span>
          {accelerationData.y}
        </div>

        <div>
          <span> average acc along y axis: </span>
          {accXY.y}
        </div>
        <div>
        <span> distance along x axis: </span>
          {distance}
        </div> 

      </div>*/}
    </>
  );
};
export default Direction;
