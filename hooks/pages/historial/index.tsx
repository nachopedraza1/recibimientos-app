import { NextPage, GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { db } from '@/database';
import { Entry } from '@/models';
import { format } from '@/utils';

import { SectionDonate } from '@/components';
import { MainLayout } from '@/components/layouts';
import { HistoryStats } from '@/components/tables';
import { ChangeNameModal } from '@/components/modals';
import { Container, Grid } from '@mui/material';

import { Rows } from '@/interfaces';

const HistoryPage: NextPage<{ history: Rows[], totalDonated: string }> = ({ history, totalDonated }) => {

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

    try {
        await db.connect();
        const historyTime = await Entry.find({ name: session.user.name })
            .select('name amount status method createdAt -_id')
            .sort({ createdAt: -1 })
            .lean();
        /* await db.disconnect(); */

        const history = historyTime.map(element => {
            return {
                ...element,
                amount: `$${format(element.amount)}`,
                createdAt: JSON.stringify(element.createdAt).slice(1, 11)
            }
        });

        const totalDonated = format(historyTime.reduce((value, current) => current.amount + value, 0));

        return {
            props: {
                history,
                totalDonated
            }
        }

    } catch (error) {
        console.log(error);

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

}


export default HistoryPage;