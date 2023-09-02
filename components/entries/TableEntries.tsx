import React, { useState } from 'react'
import { LoadDataTables } from './LoadDataTable'
import { PaginationTable } from './PaginationTable'
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, styled, tableCellClasses, Chip, Grid, InputAdornment, MenuItem, Stack, TableContainer, TextField } from '@mui/material'

import { Entry } from '@/interfaces';

//Only test
import { dbTest } from '@/database/databaseTestJson';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        textTransform: 'Capitalize',
        fontSize: 14,
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        weight: 'bold',
        fontSize: 17,
        color:'white'
    },
}));


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
                        <StyledTableCell align="center">Fecha</StyledTableCell>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
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
        </TableContainer>
    )
}
