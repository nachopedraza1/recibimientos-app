import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useNavbar } from '@/hooks/useNavbar';
import { navigateWithoutHash } from '@/utils/navigateWithoutHash';

import { AppBar, Button, Container, Grid, Toolbar } from '@mui/material';

const navLinks = [
    { id: 1, text: "inicio", path: "/#inicio" },
    { id: 2, text: "nosotros", path: "/#nosotros" },
    { id: 3, text: "ingresos", path: "/#ingresos" },
    { id: 4, text: "gastos", path: "/#gastos" },
    { id: 5, text: "noticias", path: "/#noticias" },
];

export const Navbar: FC = () => {

    const { activeTab, navbarStyle } = useNavbar();

    return (
        <Grid display={{ xs: "none", md: "flex" }}>
            <AppBar>
                <Toolbar disableGutters className={`navbar-blur ${navbarStyle}`}>
                    <Container maxWidth="lg">
                        <Grid container alignItems="center" justifyContent="space-between" gap={2}>
                            <Link href="/">
                                <Image src="/logo.png" alt='RecibimientoCAB' width={100} height={50} style={{ marginTop: "6px" }} />
                            </Link>

                            <nav>
                                {navLinks.map(({ id, path, text }) => (
                                    <Link
                                        onClick={(e) => navigateWithoutHash(e, text)}
                                        href={path}
                                        key={id}
                                        className={activeTab === text ? 'active nav-link' : 'nav-link'}
                                    >
                                        {text}
                                    </Link>
                                ))}
                                <div className={`${activeTab} animation`}></div>

                                <Button
                                    variant='contained'
                                    sx={{ marginLeft: 1 }}
                                    onClick={(e) => navigateWithoutHash(e, 'ingresos')}
                                >
                                    Aportar
                                </Button>

                            </nav>

                        </Grid>
                    </Container >
                </Toolbar>
            </AppBar>
        </Grid>
    )
}