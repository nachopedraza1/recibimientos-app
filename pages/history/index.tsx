import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { Entry } from '@/models';
import { db } from '@/database';

import { MainLayout } from '@/components/layouts';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

import { IEntry } from '@/interfaces';

const HistoryPage: NextPage<{ history: IEntry[] }> = ({ history }) => {

    const [page, setPage] = useState<number>(0);

    const simulated = [...Array(13)];
    const paginated = simulated.slice(page * 10, page * 10 + 10);

    const emptyRows = Math.max(0, (1 + page) * 10 - paginated.length);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };



    return (
        <MainLayout title='Historial | Recibimientos CAB'>

            <Grid
                className='bg-donate'
                container
                direction="column"
                justifyContent="center"
                minHeight="50vh"
                textAlign="center"
                color="white"
            >
                <Container>
                    <Typography variant="h4" fontWeight={600}>
                        Historial de Aportes
                    </Typography>
                    <span className="mini-divider" />
                    <Typography variant="h6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur autem natus nemo inventore.
                        Explicabo commodi qui, ex expedita ab unde.
                    </Typography>
                </Container>
            </Grid>

            <Container>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Fecha</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Plataforma</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Monto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {/* TODO:  */}
                            {/* {
                    isLoading
                        ? <LoadDataTables />
                        : <PaginationTable gameservers={entriesFilter} page={page} />
                } */}


                            {paginated.map(( item, index ) => (
                                <TableRow key={index}>

                                    <TableCell align="center" scope="row">
                                        1
                                    </TableCell>

                                    <TableCell align="center">
                                        2
                                    </TableCell>

                                    <TableCell align="center">
                                        3
                                    </TableCell>

                                    <TableCell align="center">
                                        4
                                    </TableCell>

                                </TableRow>
                            ))}



                            {/* TODO:  */}
                            {/*  {(emptyRows > 0 && isLoading === false) */}
                            {(emptyRows > 0) && (
                                <TableRow style={{ height: 53.02 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={simulated.length}
                                    rowsPerPage={10}
                                    rowsPerPageOptions={[10]}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    sx={{ borderBottom: "none" }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>

                </TableContainer>

            </Container>
        </MainLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    try {
        await db.connect();
        const history = await Entry.find({ userId: session.user._id }).select('name amount status method createdAt -_id').lean();
        await db.disconnect();

        return {
            props: {
                history: JSON.parse(JSON.stringify(history))
            }
        }

    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

}


export default HistoryPage;