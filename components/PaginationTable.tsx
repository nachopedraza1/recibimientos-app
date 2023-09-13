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

export const PaginationTable: FC<{ entries: IEntry[] }> = ({ entries }) => {

    return (
        <>
            {(entries).map(({ name, createdAt, amount }, index) => (
                <TableRow key={index}>

                    <StyledTableCell align="center" scope="row">
                        {createdAt.substring(0, 10)}
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