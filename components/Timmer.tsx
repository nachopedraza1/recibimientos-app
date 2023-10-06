import { FC, useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs";

import { Typography } from "@mui/material";


const getTimeRemaining = (targetDateTime: Dayjs) => {
    const now = dayjs();
    const diff = targetDateTime.diff(now, 'second');
    return Math.max(0, diff);
}

const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}

export const Timmer: FC<{ time: string }> = ({ time }) => {

    const targetDateTime = dayjs(time);

    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDateTime));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTimeRemaining = getTimeRemaining(targetDateTime);

            if (newTimeRemaining <= 0) {
                clearInterval(intervalId);
            } else {
                setTimeRemaining(newTimeRemaining);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [targetDateTime]);

    return (
        <Typography fontWeight={600} color='primary.main'>
            {timeRemaining <= 1 ? 'Finalizado' : formatTime(timeRemaining)}
        </Typography>
    )
}
