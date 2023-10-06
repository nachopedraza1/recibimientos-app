import { FC } from "react";

import { CustomTable } from "@/components/tables"
import { CustomBreadcrumbs } from "@/components/ui"
import { Typography, Grid, Box } from "@mui/material"

import { Rows } from '@/interfaces';


interface Props {
    history: Rows[],
    totalDonated: string
}

export const HistoryStats: FC<Props> = ({ history, totalDonated }) => {

    return (
        <>
            <CustomBreadcrumbs />

            <Typography variant="h4">
                Historial de Aportes
            </Typography>

            <span className="mini-divider" />

            <Grid container justifyContent="center" gap={3} mb={4}>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3} noWrap> Numero de aportes: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main"> {history.length} </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3} noWrap> Total aportado: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main">{totalDonated}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3} noWrap> Ultimo aporte: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main">{history[0].createdAt}</Typography>
                    </Box>
                </Grid>
            </Grid>

            <CustomTable
                headRows={['Fecha', 'Nombre', 'Método', 'Estado', 'Monto']}
                hiddenTotal
                tableType="entriesPrivate"
                requestType="users/history"
            />

        </>
    )
}
