import React from 'react';
import { NextPage } from 'next';

import { usePaginationRequest } from '@/hooks';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { CardLoading, MatchCard } from '@/components/cards';
import { Container, Grid, Typography } from '@mui/material';


const RecibimientosPage: NextPage = () => {

    const { results, isLoading } = usePaginationRequest('matches');

    return (
        <MainLayout title='Recibimientos CAB'>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    textAlign="center"
                    minHeight='100vh'
                    pt={10}
                    data-aos="fade"
                >
                    <Typography fontSize={{ xs: 30, sm: 35, md: 46 }} fontWeight='bold'>
                        Últimos
                        <Typography fontSize={{ xs: 30, sm: 35, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
                            Recibimientos
                        </Typography>
                    </Typography>

                    <span className="mini-divider" />
                    <Typography variant="h6" mb={3}>
                        Aquí podras ver el historial de todos los recibimientos, donde encontrarás información detallada sobre los aportes realizados hasta el momento.
                    </Typography>

                    <Grid container spacing={2}>
                        {
                            isLoading ?
                                [1, 2].map(loadCard => <CardLoading key={loadCard} />)
                                : results.rows.map(match => <MatchCard key={match.name} match={match} />)
                        }
                    </Grid>
                </Grid>


                <Blob width="50%" top="7%" left="74%" />
                <Blob width="50%" top="24%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout>
    )
}

export default RecibimientosPage;