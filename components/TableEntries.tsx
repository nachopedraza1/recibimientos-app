import React, { useState } from 'react'
import { LoadDataTables } from '@/components/ui'
import { PaginationTable } from '@/components';
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography } from '@mui/material'

import { IEntry } from '@/interfaces';

export const TableEntries = () => {

    const simulatedDataTest = [...Array(23)]

    const [entriesFilter, setEntriesFilter] = useState<IEntry[]>(simulatedDataTest);

    const [page, setPage] = useState<number>(0);

    /* TODO: search bar here */

    const emptyRows = Math.max(0, (1 + page) * 10 - simulatedDataTest.length);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Fecha</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Monto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {/* TODO:  */}
                    {/* {
                    isLoading
                        ? <LoadDataTables />
                        : <PaginationTable gameservers={entriesFilter} page={page} />
                } */}

                    <PaginationTable entries={entriesFilter} page={page} />


                    {/* TODO:  */}
                    {/* {(emptyRows > 0 && isLoading === false) && (
                        <TableRow style={{ height: 53.02 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </TableRow>
                    )} */}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={simulatedDataTest.length}
                            rowsPerPage={10}
                            rowsPerPageOptions={[10]}
                            page={page}
                            onPageChange={handleChangePage}
                            sx={{ borderBottom: "none" }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

            <Typography variant="h5" fontWeight='bold'>
                Total Recaudado:
                <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                    $300.210
                </Typography>
            </Typography>

        </TableContainer>
    )
}
