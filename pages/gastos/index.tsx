import React from 'react';

import { usePaginationRequest } from '@/hooks';

import { Blob } from '@/components/ui';
import { CustomTable } from '@/components/tables';
import { MainLayout } from '@/components/layouts';

import { Container, Grid, Typography } from '@mui/material';

const ExpensesPage = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('expenses');

    return (
        <MainLayout title='Gastos | Recibimientos CAB'>
            <Container>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    minHeight="90vh"
                    textAlign="center"
                    pt={6}
                    data-aos="fade"
                >

                    <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' mt={5}>
                        Informe de
                        <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
                            Gastos
                        </Typography>
                    </Typography>

                    <span className="mini-divider" />
                    <Typography variant="h6">
                        En este informe se reflejarán detalladamente todos los gastos asociados a los recibimientos,
                        proporcionando una visión completa de los recursos utilizados.
                    </Typography>

                    <CustomTable
                        headRows={['Fecha', 'Producto', 'Monto']}
                        handleChangePage={handleChangePage}
                        isLoading={isLoading}
                        results={results}
                        totalText='Gastos totales:'
                        tableType='expensesPublic'
                    />

                </Grid>
            </Container>
        </MainLayout>
    )
}

export default ExpensesPage;