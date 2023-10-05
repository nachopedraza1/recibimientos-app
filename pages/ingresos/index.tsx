import React, { useEffect, useState } from 'react';

import { usePaginationRequest } from '@/hooks';

import { Blob } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { CustomTable } from '@/components/tables';

import { Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EntriesPage = () => {

    const { handleChangePage, isLoading, results: data } = usePaginationRequest('entries');

    const [results, setResults] = useState(data);

    console.log(results);

    const onSearch = async (text: string) => {
        const { data } = await axios.get(`/api/search/${text}`)
        setResults(data);
    }

    useEffect(() => {
        setResults(data)
    }, [data])

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
                        Aquí podras seguir en vivo la colecta actual para el recibimiento contra Boca, donde encontrarás información detallada sobre los aportes realizados hasta el momento.
                    </Typography>

                    {/* <CounterMatch total={results.totalAmount!} /> */}

                   {/*  <Grid container justifyContent='center' mb={4}>
                        <Grid item xs={3.3}>
                            <TextField
                                fullWidth
                                size='small'
                                label='Buscar'
                                placeholder='Buscar aporte...'
                                InputProps={{
                                    sx: { borderRadius: 50 },
                                    endAdornment: (
                                        <IconButton onClick={() => onSearch('sanchez')}>
                                            <FontAwesomeIcon icon={faSearch} size='sm' />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid> */}

                    <CustomTable
                        headRows={['Fecha', 'Nombre', 'Monto']}
                        handleChangePage={handleChangePage}
                        isLoading={isLoading}
                        results={results}
                        totalText='Ingresos totales:'
                        tableType='entriesPublic'
                    >
                        {/* <Grid container padding={2}>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label='Buscar'
                                    placeholder='Buscar aporte...'
                                />
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid> */}

                    </CustomTable>
                </Grid >

                <Blob width="50%" top="7%" left="74%" />
                <Blob width="50%" top="24%" left="5%" />
                <Blob width="50%" top="52%" left="40%" />
            </Container>
        </MainLayout>
    )
}

export default EntriesPage