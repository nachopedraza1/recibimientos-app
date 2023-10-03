import { usePaginationRequest } from "@/hooks";

import { CustomTable } from '@/components/tables';
import { Grid, Typography } from "@mui/material";


export const AddUsers = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('users');

    return (
        <Grid container className="fadeIn">
            <Typography variant="h6" fontWeight={600} mt={2} mb={1}> Ultimos registros </Typography>
            <CustomTable
                headRows={['Fecha Registro', 'Nombre', 'Email', 'Rol']}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                results={results}
                totalText='Ingresos totales:'
                tableType="usersPrivate"
                hiddenTotal
            />
        </Grid>
    )
}
