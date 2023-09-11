import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';

const CountDownSecResult = ({ countdownValue ,onCountingUpStart}) => {
  const [countingUp, setCountingUp] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeHidden, setTimeHidden] = useState(false);

  const handleCountdownComplete = () => {
    setCountingUp(true);
    setTimeHidden(true);
    onCountingUpStart();
  };

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
      const minutes = Math.floor(timeElapsed / 60);
      const seconds = timeElapsed % 60;
      return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      };
    } else {
      return null;
    }
  }, [countingUp, timeElapsed]);

  return (
    <>
      {timeHidden ? (
        ''
      ) : (
        formattedTime && (
          <text>
            {formattedTime.minutes}:{formattedTime.seconds}
          </text>
        )
      )}
      {!countingUp && (
        <Countdown
          date={moment(countdownValue).valueOf() + 20 * 60000} // Changed .10 to 0.10
          renderer={({ minutes, seconds }) => (
            <text>
              {minutes}:{seconds}
            </text>
          )}
          onComplete={handleCountdownComplete}
        />
      )}
      {countingUp && (
        <text style={{ color: countingUp ? 'red' : 'black' }}>
          {formattedTime.minutes}:{formattedTime.seconds}
        </text>
      )}
    </>
  );
};

export default CountDownSecResult;
