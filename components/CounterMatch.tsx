import { ConfigContext } from "@/context/config";
import { Box, Grid, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useContext, useEffect, useState } from "react";
import { CustomDivider } from "./ui";


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


export const CounterMatch: FC<{ total: string }> = ({ total }) => {

    const { activeMatch } = useContext(ConfigContext);

    const totalCollecterd = parseFloat(total.replace(/\$|\.+/g, ''));
    const progressPercentage = Math.round((totalCollecterd / activeMatch?.objectiveAmount!) * 100);

    const targetDateTime = dayjs(activeMatch?.dateEvent);
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
        <Grid container justifyContent='center' textAlign='center'>
            <Grid item xs={10} sm={6} md={3}>
                <Typography variant="h5">
                    Próximo
                    <Typography component='span' variant="h5" ml={1} fontWeight={600} color='primary.main'>
                        Recibimiento
                    </Typography>
                </Typography>
                <Typography variant="h6" textTransform='capitalize'>
                    Belgrano - {activeMatch?.name}
                </Typography>
                <Box className='progress-bar'>
                    <Box className='progress-content' sx={{ width: `${progressPercentage}%` }}>
                        <span> {progressPercentage}% </span>
                    </Box>
                </Box>
                <Typography variant="h5" ml={1} fontWeight={600} color='primary.main'>
                    {timeRemaining <= 1 ? 'Finalizado' : formatTime(timeRemaining)}
                </Typography>
            </Grid>
        </Grid>
    )
}
