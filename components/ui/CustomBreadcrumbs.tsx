import { FC } from "react";
import Link from 'next/link';
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";

export const CustomBreadcrumbs: FC = () => {
    return (

        <Breadcrumbs sx={{ justifyContent: "center", mt: 13, mb: 1 }}>
            <MuiLink
                href="/"
                component={Link}
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"

            >
                Inicio
            </MuiLink>
            <MuiLink
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
            >
                Cuenta
            </MuiLink>
            <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
            >
                Mis aportes
            </Typography>
        </Breadcrumbs>
    );
}