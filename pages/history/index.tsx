import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { db } from '@/database';
import { Entry } from '@/models';
import { usePagination } from '@/hooks';

import { CustomTable } from '@/components';
import { MainLayout } from '@/components/layouts';
import { Container, Grid, Typography } from '@mui/material';

import { Rows } from '@/interfaces';

const HistoryPage: NextPage<{ history: Rows[] }> = ({ history }) => {

    console.log(history);

    const { page, handleChangePage } = usePagination();


    const results = {
        page,
        totalRows: history.length,
        rows: history
    }

    return (
        <MainLayout title='Historial | Recibimientos CAB'>

            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="55vh"
                textAlign="center"
                color="white"
                className='bg-donate'
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

                <CustomTable
                    headRows={['Fecha', 'Nombre', 'Monto', 'Método', 'Estado']}
                    handleChangePage={handleChangePage}
                    results={results}
                    totalText='Total aportado'
                />

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