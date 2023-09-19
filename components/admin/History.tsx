import { FC } from "react"
import { usePaginationRequest } from "@/hooks";
import { CustomTable } from "@/components"
import { Typography } from "@mui/material";

interface Props {
    type: 'entries' | 'expenses' | 'users'
    headRows: string[],
}

export const History: FC<Props> = ({ type, headRows }) => {

    const { handleChangePage, isLoading, results } = usePaginationRequest(type);

    return (
        <>
            <Typography variant="h4" fontWeight={600} mb={2}> Historial de aportes </Typography>
            <CustomTable
                headRows={headRows}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                results={results}
                totalText='Ingresos totales:'
                extendedTable={type === 'entries'}
                usersTable={type === 'users'}
            />
        </>
    )
}
