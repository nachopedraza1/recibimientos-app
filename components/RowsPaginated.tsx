import { FC } from "react";
import { TableRow, TableCell } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Rows } from "@/interfaces";


interface Props {
    page: number,
    rows: Rows[],
    extendedTable: boolean,
    usersTable?: boolean,
}

export const RowsPaginated: FC<Props> = ({ rows = [], page, extendedTable, usersTable }) => {

    const emptyRows = Math.max(0, (page * 10) - rows.length);


    return (
        <>
            {rows.map((row, index) => (
                <TableRow key={index} className="fadeIn">

                    <TableCell align="center" scope="row">
                        {row.createdAt!.substring(0, 10)}
                    </TableCell>

                    <TableCell align="center">
                        {row.name}
                    </TableCell>

                    {usersTable && (
                        <>
                            <TableCell align="center" sx={{ textTransform: 'lowercase' }}>
                                {row.email}
                            </TableCell>
                            <TableCell align="center">
                                {row.role}
                            </TableCell>
                        </>
                    )}

                    {extendedTable && (
                        <>
                            <TableCell align="center">
                                {row.method}
                            </TableCell>

                            <TableCell align="center">
                                {row.status == 'approved' || 'COMPLETED' ? <FontAwesomeIcon icon={faCircleCheck} color="#198754" /> : 'Error'}
                            </TableCell>
                        </>
                    )}

                    <TableCell align="center">
                        {row.amount}
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