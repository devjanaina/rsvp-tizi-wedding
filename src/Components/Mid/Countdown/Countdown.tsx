import { useState, useEffect } from "react";
import styles from "./Countdown.module.scss";

export interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimer({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div className={styles["countdown-container"]}>
      <div className={styles["countdown-wrapper"]}>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timer.days}</span>
          <span className={styles["countdown-text"]}>Dias</span>
        </div>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timer.hours}</span>
          <span className={styles["countdown-text"]}>Horas</span>
        </div>
        <span className={styles["divider"]}>:</span>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timer.minutes}</span>
          <span className={styles["countdown-text"]}>Minutos</span>
        </div>
        <span className={styles["divider"]}>:</span>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timer.seconds}</span>
          <span className={styles["countdown-text"]}>Segundos</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
