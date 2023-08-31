
export function calculateTimeLeft(date) {
    const difference = date?.getTime() - Date.now();
    const timeLeft = {};

    if (difference > 0) {
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft.minutes = minutes.toString().padStart(2, '0');
        timeLeft.seconds = seconds.toString().padStart(2, '0');
    }

    return timeLeft;
}

