import { useRef, useEffect } from "react";

const Alert = ({ alertMessage, className, alertX, alertY }) => {
  const alert = useRef();

  useEffect(() => {
    console.log(alert.current.style);
    console.log(alertX, alertY);
    alert.current.style.left = `${alertX}px`;
    alert.current.style.top = `${alertY}px`;
  }, [alertX, alertY]);

  return (
    <div ref={alert} className={`alert ${className}`}>
      {alertMessage}
    </div>
  );
};

export default Alert;
