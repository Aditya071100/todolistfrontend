import { useState, useRef, useEffect } from "react";
import Alert from "./Alert";

export const useAlert = (className, alertMessage) => {
  const [isAlertOn, setAlertOn] = useState(false);
  const [alertX, setAlertX] = useState(0);
  const [alertY, setAlertY] = useState(0);
  const alert = useRef();

  const handleButtonClick = (e) => {
    setAlertX(e.pageX);
    setAlertY(e.pageY);
    setAlertOn(true);
    setTimeout(() => {
      setAlertOn(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(alert.current);
  }, [alertX, alertY]);

  return (
    <div>
      {isAlertOn ? (
        <Alert
          alertMessage={alertMessage}
          className={className}
          alertX={alertX}
          alertY={alertY}
        />
      ) : null}
      <button onClick={(e) => handleButtonClick(e)}>{className}</button>
    </div>
  );
};
