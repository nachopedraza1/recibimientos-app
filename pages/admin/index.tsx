import { useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { UiContext } from '@/context/ui';

import { db } from '@/database';
import { format } from '@/utils';
import { Entry, Expense, User } from '@/models';

import { TabPanel } from '@/components/ui';
import { AdminLayout } from '@/components/layouts';
import { AddEntries, AddExpenses, Dashboard, History } from '@/components/admin';

import { DashboardStats } from '@/interfaces';
import Typography from '@mui/material/Typography'

const AdminPage: NextPage<DashboardStats> = (props) => {

    const { selectedTab } = useContext(UiContext);

    return (
        <AdminLayout>

            <TabPanel value={selectedTab} index={0}>
                <Dashboard {...props} />
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <AddEntries />
            </TabPanel>

            <TabPanel value={selectedTab} index={2}>
                <AddExpenses />
            </TabPanel>

            <TabPanel value={selectedTab} index={3}>
                <History
                    type='users'
                    title='Ultimos registros'
                    headRows={['Fecha Registro', 'Nombre', 'Email', 'Rol', '']}
                />
            </TabPanel>

            <TabPanel value={selectedTab} index={4}>
                <Typography>En desarrollo...</Typography>
            </TabPanel>

        </AdminLayout >
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        await db.connect();

        const [
            entriesMercadoPago,
            entriesTransfer,
            entriesPaypal,
            totalEntries,
            totalUser,
            totalCollected,
            totalExpenses,
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
            }]),
            Expense.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ])
        /* await db.disconnect(); */

        return {
            props: {
                entriesMercadoPago,
                entriesTransfer,
                entriesPaypal,
                totalEntries,
                totalUser,
                totalCollected: `$${format(totalCollected[0].total)}`,
                totalExpenses: `$${format(totalExpenses[0].total)}`
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