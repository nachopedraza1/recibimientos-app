import { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { UiContext } from "@/context/ui";

import { Sidebar } from "@/components/navigation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Toolbar, Container, Grid, IconButton, Box } from "@mui/material";


export const NavbarMobile: FC = () => {

    const { toggleSidebar } = useContext(UiContext)


    return (
        <>
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
            </Box >
            <Sidebar />
        </>
    )
}
