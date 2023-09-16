import { NextPage, GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { db } from '@/database';
import { Entry } from '@/models';

import { MainLayout } from '@/components/layouts';
import { PaymentButtons, HistoryStats } from '@/components';
import { Container, Grid, Typography } from '@mui/material';

import { Rows } from '@/interfaces';

const HistoryPage: NextPage<{ history: Rows[], totalDonated: number }> = ({ history, totalDonated }) => {

    return (
        <MainLayout title='Historial | Recibimientos CAB' containerPageClass="bg-history">
            <Grid
                container
                direction="column"
                minHeight="100vh"
                justifyContent="center"
                textAlign="center"
                color="white"
            >
                <Container>
                    {
                        history.length > 0 ?
                            (
                                <HistoryStats
                                    history={history}
                                    totalDonated={totalDonated}
                                />

                            )
                            :
                            (
                                <>
                                    <Typography variant="h5"> Aun no hay aportes para mostrar. </Typography>
                                    <PaymentButtons />
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

    try {
        await db.connect();
        const history = await Entry.find({ userId: session.user._id })
            .select('name amount status method createdAt -_id')
            .sort({ createdAt: -1 })
            .lean();
        await db.disconnect();

        const totalDonated = history.reduce((value, current) => current.amount + value, 0);

        return {
            props: {
                history: JSON.parse(JSON.stringify(history)),
                totalDonated
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