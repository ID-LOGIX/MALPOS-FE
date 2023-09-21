import React, { useMemo, useState, useEffect } from "react";
import moment from "moment";
import Countdown from "react-countdown";

const CountDownSecResult = ({
  countdownValue,
  onCountingUpStart,
  cookingTime,
  key,
}) => {
  const [countingUp, setCountingUp] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeHidden, setTimeHidden] = useState(false);
  const [orderKey, setOrderKey] = useState(key); // Track the order key

  const { created_at } = countdownValue;
  const cooking_time = cookingTime[0];
  const now = Date.now();
  const elapsedMilliseconds = now - moment(created_at).valueOf();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  const handleCountdownComplete = () => {
    setCountingUp(true);
    setTimeHidden(true);
    onCountingUpStart();
  };

  useEffect(() => {
    setTimeElapsed(elapsedSeconds);

    if (elapsedSeconds === cooking_time * 60) {
      setCountingUp(true);
    } else {
      setTimeHidden(true);
    }
  }, [elapsedSeconds, cooking_time]);

  useEffect(() => {
    let intervalId;

    if (countingUp) {
      intervalId = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countingUp]);

  // Reset countdown when a new order arrives with a different key
  useEffect(() => {
    if (key !== orderKey) {
      setCountingUp(false);
      setTimeElapsed(0);
      setTimeHidden(false);
      setOrderKey(key);
    }
  }, [key, orderKey]);

  const formattedTime = useMemo(() => {
    if (countingUp) {
      const minutes = Math.floor(timeElapsed / 60) - cooking_time;
      const seconds = timeElapsed % 60;
      return {
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      };
    } else {
      return null;
    }
  }, [countingUp, timeElapsed, cooking_time]);

  return (
    <>
      {timeHidden
        ? ""
        : formattedTime && (
            <text>
              {formattedTime.minutes}:{formattedTime.seconds}
            </text>
          )}
      {!countingUp && (
        <Countdown
          date={moment(created_at).valueOf() + cooking_time * 60000}
          renderer={({ minutes, seconds }) => (
            <text>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </text>
          )}
          onComplete={handleCountdownComplete}
        />
      )}
      {countingUp && (
        <text style={{ color: countingUp ? "red" : "black" }}>
          {formattedTime.minutes}:{formattedTime.seconds}
        </text>
      )}
    </>
  );
};

export default CountDownSecResult;
