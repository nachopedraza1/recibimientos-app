import React, { useContext } from 'react';
import { NextPage } from 'next';

import { ConfigContext } from '@/context/config';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { CustomTable } from '@/components/tables';

import { Container, Grid, Typography } from '@mui/material';


const EntriesPage: NextPage = () => {

    const { activeMatch } = useContext(ConfigContext);

    return (
        <MainLayout title='Ingresos | Recibimientos CAB'>
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
                            Ingresos
                        </Typography>
                    </Typography>

                    <span className="mini-divider" />
                    <Typography variant="h6" mb={3}>
                        Aquí podras seguir en vivo la colecta actual para el recibimiento contra {activeMatch?.name || '...'}, donde encontrarás información detallada sobre los aportes realizados hasta el momento.
                    </Typography>

                    <CustomTable
                        headRows={['Fecha', 'Nombre', 'Monto']}
                        totalText='Ingresos totales:'
                        tableType='entriesPublic'
                        requestType='entries'
                        searchBar
                    />
                </Grid >

                <Blob width="50%" top="7%" left="74%" />
                <Blob width="50%" top="24%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout >
    )
}

export default EntriesPage