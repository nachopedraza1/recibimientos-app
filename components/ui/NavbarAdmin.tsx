import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Box, Grid, Toolbar } from '@mui/material'

export const NavbarAdmin: FC = () => {
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Grid container alignItems="center" justifyContent="space-between" gap={2}>

                        <Link href="/">
                            <Image src="/logo.png" alt='RecibimientoCAB' width={100} height={50} style={{ marginTop: "6px" }} />
                        </Link>

                        <nav>

                        </nav>

                    </Grid >
                </Toolbar>
            </AppBar>
        </Box>
    )
}
