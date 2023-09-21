import { FC, useContext } from "react";
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';

import { UiContext } from "@/context/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Rows } from "@/interfaces";
import { useRouter } from "next/router";
import { deleteAction } from "@/database/crudActions";


interface Props {
    page: number,
    rows: Rows[],
    extendedTable: boolean,
}

export const RowsPaginated: FC<Props> = ({ rows = [], page, extendedTable }) => {

    const { asPath } = useRouter();

    const emptyRows = Math.max(0, (page * 10) - rows.length);

    const { selectedTab } = useContext(UiContext);


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

                    {selectedTab === 3 && (
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

                    {
                        selectedTab === 2 && asPath.includes('/admin') &&
                        <TableCell align="center">
                            <Tooltip title="Eliminar" placement="left" arrow>
                                <IconButton onClick={() => deleteAction(row.id, 'expenses')} disableRipple sx={{ p: 0 }}>
                                    <FontAwesomeIcon icon={faTrash} size="xs" color="#ff3333" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    }

                    {
                        selectedTab === 1 && asPath.includes('/admin') &&
                        <TableCell align="center">
                            <Tooltip title="Eliminar" placement="left" arrow>
                                <IconButton onClick={() => deleteAction(row.id, 'entries')} disableRipple sx={{ p: 0 }}>
                                    <FontAwesomeIcon icon={faTrash} size="xs" color="#ff3333" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    }

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