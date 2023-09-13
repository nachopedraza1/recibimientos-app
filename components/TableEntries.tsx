import React, { useState, useContext } from 'react'
import { PaginationTable } from '@/components';
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography } from '@mui/material'

import { IEntry } from '@/interfaces';
import { EntriesContext } from '@/context/entries';

export const TableEntries = () => {

    const { entriesData: { entries, totalEntries, page }, handleChangePage } = useContext(EntriesContext);

    const simulatedDataTest = [...Array(23)]

    const [entriesFilter, setEntriesFilter] = useState<IEntry[]>(simulatedDataTest);


    /* TODO: search bar here */

    const emptyRows = Math.max(0, (1 + page) * 10 - simulatedDataTest.length);


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

                    <PaginationTable entries={entries} />


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
                            count={totalEntries}
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
