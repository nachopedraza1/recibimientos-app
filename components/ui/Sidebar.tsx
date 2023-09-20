import { useContext } from "react";
import router from "next/router";
import Image from "next/image";

import { UiContext } from "@/context/ui";

import { faBars, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppBar, Box, Container, Divider, Drawer, Grid, IconButton, Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"

export const Sidebar = () => {

    const { toggleSidebar, sidebarMobile } = useContext(UiContext);

    return (
        <Box display={{ xs: "flex", md: "none" }}>
            <AppBar sx={{ bgcolor: 'black' }}>
                <Toolbar disableGutters>
                    <Container maxWidth="lg">
                        <Grid container justifyContent="space-between" alignItems='center'>
                            <Link href="/">
                                <Image src="/logo-loading.png" alt='RecibimientoCAB' width={80} height={40} style={{ marginTop: "6px" }} />
                            </Link>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={toggleSidebar}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </IconButton>
                        </Grid>
                    </Container >
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                anchor="right"
                open={sidebarMobile}
                onClose={toggleSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{ '& .MuiDrawer-paper': { width: '240px' } }}
            >
                <Toolbar />
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={() => router.push('/')}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faHome} />
                        </ListItemIcon>
                        <ListItemText primary={'Inicio'} />
                    </ListItemButton>
                </ListItem>

            </Drawer>
        </Box >
    )
}
