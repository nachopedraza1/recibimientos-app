import { ReactNode, FC } from 'react';
import Head from 'next/head';

import { Box, Toolbar } from '@mui/material';
import { NavbarAdmin } from '../ui';

export const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <>
            <Head>
                <title>Admin panel | Recibimientos CAB </title>
                <meta name="og:title" content='Admin panel | Recibimientos CAB' />
                <meta name="description" content='Admin Panel Recibimientos CAB' />
                <meta name="og:description" content='Admin Panel Recibimientos CAB' />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            <Box sx={{ display: 'flex' }}>

                <NavbarAdmin />

                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: 'calc(100% - 240}px)' } }}
                >
                    <Toolbar />
                    {children}
                </Box>

            </Box >
        </>
    );
}
