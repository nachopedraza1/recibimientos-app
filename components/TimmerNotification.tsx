import { FC, useContext } from "react";

import { Timmer } from "@/components";
import { ConfigContext } from "@/context/config";
import { Box, Grid, Typography } from "@mui/material";



export const TimmerNotification: FC<{ total: string }> = ({ total }) => {

    const { activeMatch } = useContext(ConfigContext);

    const totalCollecterd = parseFloat(total.replace(/\$|\.+/g, ''));
    const progressPercentage = Math.round((totalCollecterd / activeMatch?.objectiveAmount!) * 100);

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
                <Timmer time={activeMatch?.dateEvent!} />
            </Grid>
        </Grid>
    )
}
