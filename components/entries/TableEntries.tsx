import React, { useState } from 'react'
import { LoadDataTables } from '../ui/LoadDataTable'
import { PaginationTable } from './PaginationTable'
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, styled, tableCellClasses, Chip, Grid, InputAdornment, MenuItem, Stack, TableContainer, TextField, Box, Typography } from '@mui/material'

import { Entry } from '@/interfaces';

//Only test
import { dbTest } from '@/database/databaseTestJson';

export const TableEntries = () => {

    const [entriesFilter, setEntriesFilter] = useState<Entry[]>(dbTest);

    const [page, setPage] = useState<number>(0);

    const emptyRows = Math.max(0, (1 + page) * 10 - dbTest.length);

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

                    {/* {
                    isLoading
                        ? <LoadDataTables />
                        : <PaginationTable gameservers={entriesFilter} page={page} />
                } */}
                    <PaginationTable entries={entriesFilter} page={page} />

                    {/*  {(emptyRows > 0 && isLoading === false) && (
                    <TableRow style={{ height: 71.5 * emptyRows }}>
                        <StyledTableCell colSpan={6} />
                    </TableRow>
                )} */}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={dbTest.length}
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
