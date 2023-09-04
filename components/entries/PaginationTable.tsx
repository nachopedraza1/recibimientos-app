import { FC } from "react";
import { TableRow, styled, tableCellClasses, TableCell } from "@mui/material";
import { IEntry } from "@/interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        textTransform: 'Capitalize',
        fontSize: 14,
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        fontSize: 15,
    },
}));

export const PaginationTable: FC<{ entries: any[], page: number }> = ({ entries, page }) => {

    const paginated = entries.slice(page * 10, page * 10 + 10);

    return (
        <>
            {(paginated).map((item,index) => (
                <TableRow key={index}>

                    <StyledTableCell align="center" scope="row">
                        2023-06-01
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        Pablito vegetti
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        $2300
                    </StyledTableCell>

                </TableRow>
            ))}
        </>
    )
}