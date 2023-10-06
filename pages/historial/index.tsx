import { NextPage, GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";
import useSWR from 'swr';

import { SectionDonate } from '@/components';
import { MainLayout } from '@/components/layouts';
import { HistoryStats } from '@/components/tables';
import { ChangeNameModal } from '@/components/modals';

import { CircularProgress, Container, Grid } from '@mui/material';

import { Rows } from '@/interfaces';

const HistoryPage: NextPage<{ history: Rows[], totalDonated: string }> = ({ history, totalDonated }) => {

    const { data } = useSWR('/api/users/history');

    if (!data) {
        return (
            <Grid container minHeight='100vh' justifyContent='center' alignItems='center'>
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <MainLayout title='Historial | Recibimientos CAB' containerPageClass="bg-history">
            <Grid
                container
                direction="column"
                minHeight="100vh"
                justifyContent="center"
                textAlign="center"
                color="white"
                className='fadeIn'
            >
                <Container>
                    {
                        data.rows.length > 0 ?
                            (
                                <HistoryStats
                                    history={data.rows}
                                    totalDonated={data.totalAmount}
                                />
                            )
                            :
                            (
                                <>
                                    <ChangeNameModal />
                                    <SectionDonate />
                                </>
                            )
                    }
                </Container>
            </Grid>
        </MainLayout >
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

    return {
        props: {}
    }
}


export default HistoryPage;