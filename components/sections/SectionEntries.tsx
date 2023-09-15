import { FC } from 'react';

import { Blob } from '@/components/ui';
import { SectionLayout } from "@/components/layouts";
import { PaymentButtons, TableEntries, TopDonates } from "@/components";

import { Grid, Typography } from "@mui/material";


export const SectionEntries: FC = () => {
    return (
        <SectionLayout idSection="ingresos">

            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="100vh"
                textAlign="center"
                pt={10}
                data-aos="fade"
                >

                <Typography variant="h3">
                    Ultimos Ingresos
                </Typography>

                <span className="mini-divider"  />
                <Typography variant="h6" mb={5} >
                    A través de este espacio, queremos rendir homenaje a todos los hinchas que hacen posible estos increíbles recibimientos y que demuestran que el fútbol va más allá de los resultados en la cancha.
                </Typography>

                <TopDonates />

                <TableEntries />

                <PaymentButtons />
            </Grid>

            <Blob width="30%" top="10%" left="74%" />
            <Blob width="50%" top="27%" left="1%" />
            <Blob width="50%" top="52%" left="75%" />
        </SectionLayout>

    )
}
