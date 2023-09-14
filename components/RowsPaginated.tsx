import { FC } from "react";
import { TableRow, TableCell } from "@mui/material";

interface Rows {
    name: string,
    amount: number,
    createdAt: string,
}

export const RowsPaginated: FC<{ entries: Rows[] }> = ({ entries }) => {

    return (
        <>
            {entries.map(({ name, createdAt, amount }, index) => (
                <TableRow key={index} className="fadeIn">

                    <TableCell align="center" scope="row">
                        {createdAt.substring(0, 10)}
                    </TableCell>

                    <TableCell align="center">
                        {name}
                    </TableCell>

                    <TableCell align="center">
                        ${amount}
                    </TableCell>

                </TableRow>
            ))}
        </>
    )
}