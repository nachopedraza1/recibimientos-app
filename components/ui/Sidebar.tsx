import { FormEvent, useContext } from "react";

import { useNavbar } from "@/hooks";
import { UiContext } from "@/context/ui";
import { AuthContext } from "@/context/auth";
import { SidebarUserButtons } from "@/components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFileInvoiceDollar, faHome, faMoneyBillTransfer, faUsers } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Avatar, Box, Button, Divider, Drawer, Grid, IconButton, Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';


const navlinks = [
    { text: 'Inicio', path: 'inicio', icon: faHome },
    { text: 'Ingresos', path: 'ingresos', icon: faMoneyBillTransfer },
    { text: 'Gastos', path: 'gastos', icon: faFileInvoiceDollar },
    { text: 'Nosotros', path: 'nosotros', icon: faUsers },
];

export const Sidebar = () => {

    const { toggleSidebar, sidebarMobile } = useContext(UiContext);
    const { user } = useContext(AuthContext);

    const { navigateWithoutHash } = useNavbar();

    const toggleNavegation = (event: FormEvent, text: string) => {
        navigateWithoutHash(event, text);
        toggleSidebar();
    }

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={sidebarMobile}
            onClose={toggleSidebar}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: '240px' } }}
        >
            <Toolbar >
                <Grid container justifyContent="space-between" alignItems="center">
                    {
                        user ?
                            <Box display='flex' alignItems='center'>
                                <Avatar src={user?.image ? user.image : '/default-avatar.jpg'} />
                                <Box ml={1} maxWidth={115}>
                                    <Typography fontSize={13} noWrap textTransform='capitalize'> {user?.name} </Typography>
                                    <Typography fontSize={10} noWrap> {user?.email} </Typography>
                                </Box>
                            </Box>
                            :
                            <Link href={'/auth/login'}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    sx={{ marginLeft: 1 }}
                                >
                                    Ingresar
                                </Button>
                            </Link>
                    }
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleSidebar}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </IconButton>
                </Grid>
            </Toolbar>

            <Divider />
            {
                navlinks.map(({ text, icon, path }) => (
                    <ListItem disablePadding key={text}>
                        <ListItemButton onClick={(e) => toggleNavegation(e, path)}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={icon} />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
            <Divider />

            {user && <SidebarUserButtons />}

        </Drawer>
    )
}
