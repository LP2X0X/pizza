import { useEffect, useState } from 'react';
import styles from './CountDownTimer.module.css';

function formatDateAndTime(dateAndTime) {
  const data = new Date(dateAndTime);
  return data.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CountDownTimer({ estimatedDelivery, setHasOrderArrived }) {
  const estimatedDate = formatDateAndTime(estimatedDelivery);

  const [minuteLeft, setMinuteLeft] = useState(
    Math.floor(
      (new Date(estimatedDelivery).getTime() - new Date().getTime()) /
        (60 * 1000)
    )
  );

  if (minuteLeft === 0) {
    setHasOrderArrived(true);
  }

  useEffect(
    function () {
      function updateTimeLeft() {
        const timeLeft =
          new Date(estimatedDelivery).getTime() - new Date().getTime();

        setMinuteLeft(Math.floor(timeLeft / (60 * 1000)));
      }

      const id = setInterval(() => updateTimeLeft(), 60 * 1000);

      return () => clearInterval(id);
    },
    [estimatedDelivery]
  );

  return (
    <section className={styles.timer}>
      <p className={styles.timeLeft}>
        {minuteLeft > 0
          ? `Only ${minuteLeft} minutes left 😊`
          : `Your order should have arrived`}
      </p>
      <p className={styles.eta}>(Estimated delivery: {estimatedDate})</p>
    </section>
  );
}

export default CountDownTimer;
