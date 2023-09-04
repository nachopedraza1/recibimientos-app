import { FC } from 'react';
import { SectionLayout } from "../layouts";
import { Grid, Typography } from "@mui/material";

export const SectionNotices: FC = () => {
    return (
        <SectionLayout idSection="noticias">
            <Grid
                container
                direction="column"
                minHeight="100vh"
                textAlign="center"
                pt={10}
            >

                <Typography variant="h3">
                    Ultimas noticias
                </Typography>

                <span className="mini-divider" />

                <Typography variant="h5">
                    Aqui puede ir el feed de ig y tw (API)
                </Typography>

            </Grid>
        </SectionLayout>
    )
}
