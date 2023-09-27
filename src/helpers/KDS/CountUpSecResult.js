import React, { useMemo, useState, useEffect } from "react";
import moment from "moment";

const CountUpSecResult = ({
  countdownValue,

  cookingTime,
}) => {
  const [countingUp, setCountingUp] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const  created_at  = countdownValue;
  const cooking_time = cookingTime;
  const now = Date.now();
  const elapsedMilliseconds = now - moment(created_at).valueOf() - 5 * 60 * 60000;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  useEffect(() => {
    setTimeElapsed(elapsedSeconds);

    if (elapsedSeconds > cooking_time * 60) {
      setCountingUp(true);
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
  }, [countingUp, timeElapsed]);

  return (
    <>
      {countingUp && (
        <text style={{ color: countingUp ? "#ffd4c4" : "" }}>
          {formattedTime.minutes}:{formattedTime.seconds}
        </text>
      )}
    </>
  );
};

export default CountUpSecResult;
