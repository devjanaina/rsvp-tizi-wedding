import { useState, useEffect } from "react";
import styles from "./Countdown.module.scss";

export function Countdown() {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("2023-07-16T09:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setTimerDays(days);

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setTimerHours(hours);

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setTimerMinutes(minutes);

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimerSeconds(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={styles["countdown-container"]}>
      <div className={styles["countdown-wrapper"]}>
        <div className={styles["countdown-item"]}>
          <span className={styles['days-splitter']}>
          <span className={styles["countdown-time"]}>{timerDays}</span>
          <span className={styles["countdown-text"]}>Dias</span>
          </span>
        </div> 
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timerHours}</span>
          <span className={styles["countdown-text"]}>Horas</span>
        </div>
        <span className={styles['divider']}>:</span>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timerMinutes}</span>
          <span className={styles["countdown-text"]}>Minutos</span>
        </div>
        <span className={styles['divider']}>:</span>
        <div className={styles["countdown-item"]}>
          <span className={styles["countdown-time"]}>{timerSeconds}</span>
          <span className={styles["countdown-text"]}>Segundos</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
