import { FC } from "react";
import { TableRow, TableCell } from "@mui/material";
import { IEntry } from "@/interfaces";


export const PaginationTable: FC<{ entries: IEntry[] }> = ({ entries }) => {

    return (
        <>
            {entries.map(({ name, createdAt, amount }, index) => (
                <TableRow key={index}>

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