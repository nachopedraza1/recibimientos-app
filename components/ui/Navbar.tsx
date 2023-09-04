import { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useNavbar } from '@/hooks/useNavbar';
import { navigateWithoutHash } from '@/utils';

import { AppBar, Button, Container, Grid, Toolbar } from '@mui/material';
import { UserButtons } from '@/components/ui';

const navLinks = [
    { id: 1, text: "inicio", path: "/#inicio" },
    { id: 2, text: "nosotros", path: "/#nosotros" },
    { id: 3, text: "ingresos", path: "/#ingresos" },
    { id: 4, text: "gastos", path: "/#gastos" },
    { id: 5, text: "noticias", path: "/#noticias" },
];

export const Navbar: FC = () => {

    const router = useRouter();

    const { status } = useSession();

    const { activeSection, navbarBlur } = useNavbar();

    return (
        <Grid display={{ xs: "none", md: "flex" }}>
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

                                {/* {
                                    status === 'unauthenticated' ?
                                        (
                                            <Link href={`/auth/login/${router.asPath}`}>
                                                <Button
                                                    variant='contained'
                                                    sx={{ marginLeft: 1 }}
                                                >
                                                    Ingresar
                                                </Button>
                                            </Link>
                                        ) : < UserButtons />
                                } */}

                            </nav>

                        </Grid>
                    </Container >
                </Toolbar>
            </AppBar>
        </Grid >
    )
}