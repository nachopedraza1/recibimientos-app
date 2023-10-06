import React, { useContext } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import { usePaginationRequest } from '@/hooks';

import { Timmer } from '@/components';
import { MainLayout } from '@/components/layouts';
import { Blob, ProgressBar } from '@/components/ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faEllipsisVertical, faSackDollar, faStar } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';


const RecibimientosPage: NextPage = () => {

    const { results } = usePaginationRequest('matches');

    if (!results) {
        return <>Loading...</>
    }

    return (
        <MainLayout title='Recibimientos CAB'>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    textAlign="center"
                    pt={10}
                    data-aos="fade"
                >
                    <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold'>
                        Últimos
                        <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
                            Recibimientos
                        </Typography>
                    </Typography>

                    <span className="mini-divider" />
                    <Typography variant="h6" mb={3}>
                        Aquí podras ver el historial de todos los recibimientos, donde encontrarás información detallada sobre los aportes realizados hasta el momento.
                    </Typography>
                </Grid>

                <Grid container spacing={2}>
                    {results.rows.map(row => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#121112' }}>
                                            <Image src='/logo-loading.png' width={40} height={50} alt='Recibimientos CAB' />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton sx={{ margin: 1 }} disableRipple>
                                            <FontAwesomeIcon icon={faEllipsisVertical} size='sm' />
                                        </IconButton>
                                    }
                                    title={`Belgrano - ${row.name}`}
                                    subheader={<Timmer time={row.dateEvent!} />}
                                    sx={{ padding: 1 }}
                                />
                                <CardMedia
                                    loading='eager'
                                    component="img"
                                    image={row.imageMatch}
                                    alt="Recibimientos CAB"
                                    sx={{ height: { xs: 'auto', sm: '370px' } }}
                                />
                                <CardContent>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={6} >
                                            <Typography>
                                                <FontAwesomeIcon icon={faStar} style={{ marginRight: 5 }} color='#08b8ef' />
                                                Objetivo:
                                            </Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography>
                                                {row.objectiveAmount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <FontAwesomeIcon icon={faSackDollar} style={{ marginRight: 5 }} color='green' />
                                                Recaudado:
                                            </Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography>
                                                {row.totalDonated}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <FontAwesomeIcon icon={faCoins} style={{ marginRight: 5 }} color='yellow' />
                                                Sobrante:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                {row.overage}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <ProgressBar total={row.totalDonated!} objetive={row.objectiveAmount!} />
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Blob width="50%" top="7%" left="74%" />
                <Blob width="50%" top="24%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout>
    )
}

export default RecibimientosPage;