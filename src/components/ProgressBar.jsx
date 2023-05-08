import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const [progress,setProgress] = useState(33);
  useEffect(()=>{
    if(location.pathname==='/') setProgress(33);
    else if(location.pathname==='/form') setProgress(66);
    else if(location.pathname==='/form2') setProgress(90);
  },[location])
  return (
    <div className="Progress-Div">
      <div className="mainProgress-conatiner">
        <div className="Progress-container">
          <div className="color-fill-P" style={{width:`${progress}%`}}></div>
        </div>
        <p className="Percent-progress">
          {progress}
          {"%"}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
