import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { UiContext } from '@/context/ui';

import { db } from '@/database';
import { format } from '@/utils';
import { Entry, User } from '@/models';

import { TabPanel } from '@/components/ui';
import { Dashboard } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import { Grid } from '@mui/material';

import { DashboardStats } from '@/interfaces';


const AdminPage: NextPage<DashboardStats> = (props) => {

    const { selectedTab } = useContext(UiContext);

    return (
        <AdminLayout>

            <TabPanel value={selectedTab} index={0}>
                <Dashboard {...props} />
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <Grid container alignItems="center" className="fade">
                    asdasdasd123123
                </Grid>
            </TabPanel>

        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        await db.connect();

        const [
            entriesMercadoPago,
            entrieTransfer,
            entriesPaypal,
            totalEntries,
            totalUser,
            totalCollected,
        ] = await Promise.all([
            Entry.find({ method: 'mercadopago' }).count(),
            Entry.find({ method: 'transfer' }).count(),
            Entry.find({ method: 'paypal' }).count(),
            Entry.find().count(),
            User.find().count(),
            Entry.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ])
        await db.disconnect();

        return {
            props: {
                entriesMercadoPago,
                entrieTransfer,
                entriesPaypal,
                totalEntries,
                totalUser,
                totalCollected: `$${format(totalCollected[0].total)}`,
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

export default AdminPage;