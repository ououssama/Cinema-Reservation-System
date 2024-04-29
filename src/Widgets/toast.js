import { useState, useRef, useEffect } from "react";

export default function Toast(props) {
  const [visibility, setVisibility] = useState(false);
  const progressBarRef = useRef();
  const toastRef = useRef();

  useEffect(() => {
    if (props.visible) {
      toastRef.current.style.display = "block";
      progressBarRef.current.style["animation-play-state"] = "running";
      setTimeout(() => {
        console.log("hide");
        toastRef.current.style.opacity = 0;
        setTimeout(() => {
          toastRef.current.style.display = "none";
        }, 500);
      }, 2500);
    } else {
      progressBarRef.current.style["animation-play-state"] = "pause";
    }
  }, [props.visible]);

  return (
    <div className="toast" ref={toastRef}>
      <div className="toast-container">
        <div className="toast-header">
          <div className="progress-bar-path"></div>
          <div className="progress-bar-fill" ref={progressBarRef}></div>
        </div>
        <div className="toast-body">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
