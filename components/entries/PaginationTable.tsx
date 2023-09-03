import { FC } from "react";

import { TableRow, styled, tableCellClasses, TableCell } from "@mui/material";

import { Entry } from "@/interfaces";


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

export const PaginationTable: FC<{ entries: Entry[], page: number }> = ({ entries, page }) => {

    const paginated = entries.slice(page * 10, page * 10 + 10);

    return (
        <>
            {(paginated).map(({ name, amount, date }) => (
                <TableRow key={name}>

                    <StyledTableCell align="center" scope="row">
                        {date}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        {name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        ${amount}
                    </StyledTableCell>

                </TableRow>
            ))}
        </>
    )
}