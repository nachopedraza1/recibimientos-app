import { FC } from "react";

import { CustomTable } from '@/components/tables';
import { Grid, Typography } from "@mui/material";


export const AddUsers: FC = () => {

    return (
        <Grid container className="fadeIn">
            <Typography variant="h6" fontWeight={600} mt={2} mb={1}> Ultimos registros </Typography>
            <CustomTable
                headRows={['Fecha Registro', 'Nombre', 'Email', 'Rol']}
                totalText='Ingresos totales:'
                tableType="usersPrivate"
                requestType="users"
                hiddenTotal
            />
        </Grid>
    )
}
