import React from 'react';

import { usePaginationRequest } from '@/hooks';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { CustomTable } from '@/components/tables';

import { Container, Grid, Typography } from '@mui/material';

const RecibimientosPage = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('entries');

    return (
        <MainLayout title='Recibimientos CAB'>
            <Container>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    minHeight="100vh"
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

                    <Grid container>

                    </Grid>

                    <CustomTable
                        headRows={['Fecha', 'Nombre', 'Monto']}
                        handleChangePage={handleChangePage}
                        isLoading={isLoading}
                        results={results}
                        totalText='Ingresos totales:'
                        tableType='entriesPublic'
                    />
                </Grid >
            </Container>
        </MainLayout>
    )
}

export default RecibimientosPage;