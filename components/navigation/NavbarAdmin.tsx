import { FC, useContext, useState } from 'react';

import { ConfigContext } from '@/context/config';

import { DrawerAdmin } from '@/components/navigation';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Grid } from '@mui/material';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface Props {
    window?: () => Window;
}

export const NavbarAdmin: FC<Props> = ({ window }) => {

    const { activeMatch } = useContext(ConfigContext);

    const [mobileOpen, setMobileOpen] = useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'black',
                    width: { sm: 'calc(100% - 240}px)' },
                    ml: { sm: '240px' },
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Typography>
                            Admin Panel
                        </Typography>
                        <Typography fontWeight={600} color='primary.main'>
                            Recibimiento activo:
                            <Typography component='span' color='white' textTransform='capitalize' ml={1}>
                                {activeMatch?.name}
                            </Typography>
                        </Typography>
                    </Grid>
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
                    <DrawerAdmin drawerToggle={handleDrawerToggle} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
                    }}
                    open
                >
                    <DrawerAdmin drawerToggle={handleDrawerToggle} />
                </Drawer>
            </Box>
        </>
    )
}
