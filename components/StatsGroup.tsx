import { FC } from 'react';
import { CountUp } from "use-count-up";

import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import { useInView } from 'react-intersection-observer'

const stats = [
    { title: "Recibimientos", value: 50, icon: <FontAwesomeIcon icon={faMagicWandSparkles} /> },
    { title: "Aportes recibidos", value: 5000, icon: <FontAwesomeIcon icon={faMedal} /> },
    { title: "Minutos 68", value: 50, icon: <FontAwesomeIcon icon={faStar} /> },
]

export const StatsGroup: FC = () => {

    const { inView, ref } = useInView();

    return (
        <Grid
            container
            justifyContent="center"
            className="stats-box"
            ref={ref}
            gap={{ xs: 4, sm: 0 }}
            direction={{ xs: "column", sm: "row" }}
            mt={5}
        >
            {stats.map(({ title, value, icon }) => (
                <Grid item xs={2} textAlign="center" key={title}>
                    {icon}
                    <Typography className="count">+<CountUp isCounting={inView} end={value} duration={3.2} /> </Typography>
                    <span className="divider"></span>
                    <Typography variant="h6"> {title} </Typography>
                </Grid>
            ))}
        </Grid>
    )
}
