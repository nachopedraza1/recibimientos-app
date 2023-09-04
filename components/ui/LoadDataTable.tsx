import { TableRow, TableCell, Skeleton } from "@mui/material"

export const LoadDataTables = () => {

    return (
        <TableRow>
            <TableCell colSpan={5} >
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
            </TableCell>
        </TableRow>
    )
}