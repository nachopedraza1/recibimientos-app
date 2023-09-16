import { FC } from "react";
import { format } from '@/utils';
import { TableRow, TableCell } from "@mui/material";

import { Rows } from "@/interfaces";


export const RowsPaginated: FC<{ rows: Rows[], page: number }> = ({ rows, page }) => {

    if (!rows) return (<></>)

    const emptyRows = Math.max(0, (page * 10) - rows.length) || 0;

    return (
        <>
            {rows.map(({ name, createdAt, amount, method, status }, index) => (
                <TableRow key={index} className="fadeIn">

                    <TableCell align="center" scope="row">
                        {createdAt!.substring(0, 10)}
                    </TableCell>

                    <TableCell align="center">
                        {name}
                    </TableCell>

                    {
                        method &&
                        (
                            <TableCell align="center">
                                {method}
                            </TableCell>
                        )
                    }

                    {
                        status &&
                        (
                            <TableCell align="center">
                                {status}
                            </TableCell>
                        )
                    }

                    <TableCell align="center">
                        ${format(amount)}
                    </TableCell>

                </TableRow >
            ))}

            {
                emptyRows > 0 &&
                <TableRow style={{ height: 53.02 * emptyRows, padding: 0 }}>
                    <TableCell colSpan={6} />
                </TableRow>
            }
        </>
    )
}