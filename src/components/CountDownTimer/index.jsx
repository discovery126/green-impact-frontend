import { useEffect, useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import s from "./index.module.scss";

const CountdownTimer = ({ expiredDate, top = "15px", left = "190px" }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiredDate) - new Date();
    if (difference <= 0) return null;
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / 1000 / 60 / 60) % 24);
    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiredDate]);

  if (!expiredDate) return;
  if (!timeLeft) return;

  return (
    <div className={s["countdown"]} style={{ top, left }}>
      <IoTimerOutline />
      {timeLeft.days > 0 && `${timeLeft.days}д `}
      {timeLeft.hours}ч {timeLeft.minutes}м
    </div>
  );
};

export default CountdownTimer;
