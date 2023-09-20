import { useContext } from 'react';
import { NextPage } from 'next';

import { UiContext } from '@/context/ui';

import { TabPanel } from '@/components/ui';
import { AdminLayout } from '@/components/layouts';
import { AddEntries, AddExpenses, AddUsers, Dashboard } from '@/components/admin';
import { Typography } from '@mui/material';


const AdminPage: NextPage = () => {

    const { selectedTab } = useContext(UiContext);

    return (
        <AdminLayout>

            <TabPanel value={selectedTab} index={0}>
                <Dashboard />
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <AddEntries />
            </TabPanel>

            <TabPanel value={selectedTab} index={2}>
                <AddExpenses />
            </TabPanel>

            <TabPanel value={selectedTab} index={3}>
                <AddUsers />
            </TabPanel>

            <TabPanel value={selectedTab} index={4}>
                <Typography>En desarrollo...</Typography>
            </TabPanel>

        </AdminLayout >
    )
}

export default AdminPage;