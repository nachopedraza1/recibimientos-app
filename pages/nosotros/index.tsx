import React from 'react';
import { NextPage } from 'next';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { InstagramPosts, StatsGroup } from '@/components';
import { Grid, Typography, Container } from '@mui/material';


const AboutPage: NextPage = () => {
    return (
        <MainLayout title='Nosotros | Recibimientos CAB'>
            <Container>

                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    minHeight={{ md: '90vh', xl: '70vh' }}
                    pt={11}
                >
                    <Grid item xs={12} textAlign="center">

                        <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold'>
                            Nosotros
                        </Typography>

                        <span className='mini-divider' data-aos="fade-in"></span>
                        <Typography variant="h6" data-aos="fade-in">
                            RecibimientosCAB es la unión de todas las agrupaciones de Belgrano, que representan a las cuatro tribunas con un único propósito:
                            seguir metiendo la fiesta más grande del país en cada partido. Además, compartiremos información relevante sobre próximos recibimientos
                            y eventos relacionados con la hinchada de Belgrano.
                            Queremos mantener a nuestros hinchas informados y conectados en todo momento. A los recibimientos los hacemos entre todos.
                        </Typography>

                        <StatsGroup />

                        <InstagramPosts />

                    </Grid>
                </Grid>


                <Blob width="25%" top="0%" left="80%" />
                <Blob width="50%" top="30%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout>
    )
}

export default AboutPage;