import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { useNavbar } from '@/hooks';

import { UserButtons } from '@/components/navigation';
import { AppBar, Box, Button, Container, Grid, Toolbar } from '@mui/material';

const navLinks = [
    { id: 1, text: "inicio", path: "/#inicio" },
    { id: 3, text: "ingresos", path: "/#ingresos" },
    { id: 4, text: "gastos", path: "/#gastos" },
    { id: 2, text: "nosotros", path: "/#nosotros" },
];

export const NavbarDesktop: FC = () => {

    const { status } = useSession();

    const { activeSection, navbarBlur, navigateWithoutHash } = useNavbar();

    return (
        <Box display={{ xs: "none", md: "flex" }}>
            <AppBar>
                <Toolbar disableGutters className={`navbar-blur ${navbarBlur}`}>
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
                                        className={activeSection === text ? 'active nav-link' : 'nav-link'}
                                    >
                                        {text}
                                    </Link>
                                ))}

                                <div className={`${activeSection} animation`}></div>

                                {
                                    status === 'unauthenticated' ?
                                        (
                                            <Link href={'/auth/login'}>
                                                <Button
                                                    variant='contained'
                                                    sx={{ marginLeft: 2 }}
                                                >
                                                    Ingresar
                                                </Button>
                                            </Link>
                                        ) : < UserButtons />
                                }

                            </nav>

                        </Grid>
                    </Container >
                </Toolbar>
            </AppBar>
        </Box >
    )
}