import { FC } from "react"
import { usePaginationRequest } from "@/hooks";
import { CustomTable } from "@/components"
import { Typography } from "@mui/material";

interface Props {
    title: string,
    type: 'entries' | 'expenses' | 'users'
    headRows: string[],
}

export const History: FC<Props> = ({ type, headRows, title }) => {

    const { handleChangePage, isLoading, results } = usePaginationRequest(type);

    return (
        <>
            <Typography variant="h6" fontWeight={600} mt={2} mb={1}> {title}  </Typography>
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
