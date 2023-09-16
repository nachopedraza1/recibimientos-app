import { Typography, Grid, Box } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { CustomTable } from "."
import { CustomBreadcrumbs } from "./ui"
import { Results, Rows } from "@/interfaces"
import { format } from "@/utils"


interface Props {
    history: Rows[],
    totalDonated: number
}

export const HistoryStats: FC<Props> = ({ history, totalDonated }) => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const [results, setResults] = useState<Results>({
        page,
        totalRows: 0,
        totalAmount: 0,
        rows: []
    });

    useEffect(() => {
        const paginated = history.slice(page * 10, page * 10 + 10);

        setResults({
            page,
            totalRows: history.length,
            totalAmount: totalDonated,
            rows: paginated,
        })
    }, [page])

    return (
        <>
            <CustomBreadcrumbs />

            <Typography variant="h4" fontWeight={600}>
                Historial de Aportes
            </Typography>

            <span className="mini-divider" />

            <Grid container justifyContent="center" gap={3} mb={4}>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3}> Numero de aportes: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main"> {history.length} </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3}> Total aportado: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main">$  {format(totalDonated)} </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} className='top-box'>
                    <Typography variant='h6' mb={3}> Ultimo aporte: </Typography>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="h5" color="primary.main">{history[0].createdAt.slice(0, 10)}</Typography>
                    </Box>
                </Grid>
            </Grid>

            <CustomTable
                headRows={['Fecha', 'Nombre', 'Método', 'Estado', 'Monto']}
                handleChangePage={handleChangePage}
                totalText='Total aportado'
                results={results}
                hiddenTotal
            />
            
        </>
    )
}
