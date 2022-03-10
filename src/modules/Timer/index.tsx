import { FC, useEffect, useRef, useState } from "react";
import moment from "moment";

import Display from "../../components/Display";
import ActionButtons from "../../components/ActionButtons";
import TimePicker from "../../components/TimePicker";

import { useTimerStyles } from "./styles";

const initialTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const Timer: FC = () => {
  const { classes, cx } = useTimerStyles();

  let countdownTime: React.MutableRefObject<any> = useRef(null);

  const [countdownDate, setCountdownDate] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isRunning, setIsRunning] = useState<boolean>();

  const countTime = (date: number) => {
    const now = new Date().getTime();

    const timeLeft = date - now;

    // Calculating the days, hours, minutes and seconds left
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000) + 1;

    // Result is output to the specific element
    setRemainingTime({
      hours: String(hours > 9 ? hours : "0" + hours),
      minutes: String(minutes > 9 ? minutes : "0" + minutes),
      seconds: String(seconds > 9 ? seconds : "0" + seconds),
    });

    // Display the message when countdown is over
    if (timeLeft < 0) {
      clearInterval(countdownTime.current);
      setIsTimeUp(true);
      setRemainingTime(initialTime);
      setIsRunning(false);
    }
  };

  const onStart = () => {
    setIsRunning(true);
    const toBeDate = moment()
      .add(remainingTime.hours, "hours")
      .add(remainingTime.minutes, "minutes")
      .add(remainingTime.seconds, "seconds")
      .toDate();

    countdownTime.current = setInterval(
      () => countTime(toBeDate.getTime()),
      1000
    );
  };

  const onStop = () => {
    setIsRunning(false);
    clearInterval(countdownTime.current);
  };

  const onReset = () => {
    setIsRunning(false);
    clearInterval(countdownTime.current);
    setIsTimeUp(false);
    setRemainingTime(initialTime);
    setCountdownDate(null);
  };

  useEffect(() => {
    if (isTimeUp) {
      setTimeout(onReset, 2000);
    }
  }, [isTimeUp]);

  return (
    <div className={cx(classes.container)}>
      <TimePicker
        countdownDate={countdownDate}
        setCountdownDate={setCountdownDate}
        setRemainingTime={setRemainingTime}
      />
      <Display isTimeUp={isTimeUp} remainingTime={remainingTime} />
      <ActionButtons
        countdownDate={countdownDate}
        isRunning={isRunning}
        onStart={onStart}
        onReset={onReset}
        onStop={onStop}
      />
    </div>
  );
};

export default Timer;
