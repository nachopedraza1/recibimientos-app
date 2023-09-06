import { ReactNode, useState } from 'react';
import Head from 'next/head';

import { DrawerAdmin } from '@/components/ui';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


interface Props {
    window?: () => Window;
    children: ReactNode;
}

export default function AdminLayout(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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

                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: 'white',
                        width: { sm: 'calc(100% - 240}px)' },
                        ml: { sm: '240px' },
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Panel
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box
                    component="nav"
                    sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
                >

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
                        }}
                    >
                        <DrawerAdmin />
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
                        }}
                        open
                    >
                        <DrawerAdmin />
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: 'calc(100% - 240}px)' } }}
                >
                    <Toolbar />
                    {props.children}
                </Box>

            </Box>
        </>
    );
}
