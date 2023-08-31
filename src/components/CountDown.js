import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const CountDown = ({ orderCreatedDate }) => {
    const targetTime = new Date(orderCreatedDate).getTime() + 20 * 60 * 1000; // Add 20 minutes to the created date

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function calculateTimeLeft() {
        const difference = targetTime - Date.now();
        const timeLeft = {};

        if (difference > 0) {
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            timeLeft.minutes = minutes.toString().padStart(2, '0');
            timeLeft.seconds = seconds.toString().padStart(2, '0');
        }

        return timeLeft;
    }

    return (
        <div>
            <h2>Countdown Timer</h2>
            {Object.keys(timeLeft).length > 0 ? (
                <p>
                    {timeLeft.minutes}:{timeLeft.seconds}
                </p>
            ) : (
                <p>Countdown finished!</p>
            )}
        </div>
    );
}

export default CountDown