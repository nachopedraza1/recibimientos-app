import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { UiContext } from "@/context/ui";
import { deleteAction } from "@/database/crudActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import { SwitchTableRow } from "@/components/tables";
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { Rows } from "@/interfaces";


interface Props {
    page: number,
    rows: Rows[],
    tableType: 'entriesPublic' | 'entriesPrivate' | 'expensesPublic' | 'usersPrivate' | 'matchesPrivate'
}

export const RowsPaginated: FC<Props> = ({ tableType, rows = [], page }) => {

    const { asPath } = useRouter();

    const emptyRows = 10 - rows.length;

    const { selectedTab } = useContext(UiContext);

    return (
        <>
            {rows.map((row, index) => (
                <TableRow key={index} className="fadeIn">

                    {
                        tableType === 'entriesPublic' &&
                        (
                            <>
                                <TableCell align="center" scope="row">
                                    {row.createdAt!.substring(0, 10)}
                                </TableCell>

                                <TableCell align="center">
                                    {row.name}
                                </TableCell>

                                <TableCell align="center">
                                    {row.amount}
                                </TableCell>
                            </>
                        )
                    }

                    {
                        tableType === 'entriesPrivate' &&
                        (
                            <>
                                <TableCell align="center" scope="row">
                                    {row.createdAt!.substring(0, 10)}
                                </TableCell>

                                <TableCell align="center">
                                    {row.name}
                                </TableCell>

                                <TableCell align="center">
                                    {row.method}
                                </TableCell>

                                <TableCell align="center">
                                    {row.status == 'approved' || 'COMPLETED' ? <FontAwesomeIcon icon={faCircleCheck} color="#198754" /> : 'Error'}
                                </TableCell>

                                <TableCell align="center">
                                    {row.amount}
                                </TableCell>

                            </>
                        )
                    }

                    {
                        tableType === 'expensesPublic' &&
                        (
                            <>
                                <TableCell align="center" scope="row">
                                    {row.createdAt!.substring(0, 10)}
                                </TableCell>

                                <TableCell align="center">
                                    {row.name}
                                </TableCell>

                                <TableCell align="center">
                                    {row.amount}
                                </TableCell>
                            </>
                        )
                    }

                    {tableType === 'usersPrivate' && (
                        <>
                            <TableCell align="center" scope="row">
                                {row.createdAt!.substring(0, 10)}
                            </TableCell>

                            <TableCell align="center">
                                {row.name}
                            </TableCell>

                            <TableCell align="center" sx={{ textTransform: 'lowercase' }}>
                                {row.email}
                            </TableCell>

                            <TableCell align="center">
                                {row.role}
                            </TableCell>
                        </>
                    )}

                    {tableType === 'matchesPrivate' && (
                        <>
                            <TableCell align="center" scope="row">
                                {row.dateEvent!.substring(0, 10)}
                            </TableCell>

                            <TableCell align="center">
                                {row.name}
                            </TableCell>

                            <TableCell align="center" sx={{ textTransform: 'lowercase' }}>
                                {row.totalDonated}
                            </TableCell>

                            <TableCell align="center" sx={{ textTransform: 'lowercase' }}>
                                {row.objectiveAmount}
                            </TableCell>

                            <TableCell align="center">
                                <SwitchTableRow row={row} />
                            </TableCell>
                        </>
                    )}

                    {
                        selectedTab === 1 && asPath.includes('/admin') &&
                        <TableCell align="center">
                            <Tooltip title="Eliminar" placement="left" arrow>
                                <IconButton onClick={() => deleteAction(row._id, 'matches')} disableRipple sx={{ p: 0 }}>
                                    <FontAwesomeIcon icon={faTrash} size="xs" color="#ff3333" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    }
                    {
                        selectedTab === 2 && asPath.includes('/admin') &&
                        <TableCell align="center">
                            <Tooltip title="Eliminar" placement="left" arrow>
                                <IconButton onClick={() => deleteAction(row._id, 'entries')} disableRipple sx={{ p: 0 }}>
                                    <FontAwesomeIcon icon={faTrash} size="xs" color="#ff3333" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    }
                    {
                        selectedTab === 3 && asPath.includes('/admin') &&
                        <TableCell align="center">
                            <Tooltip title="Eliminar" placement="left" arrow>
                                <IconButton onClick={() => deleteAction(row._id, 'expenses')} disableRipple sx={{ p: 0 }}>
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