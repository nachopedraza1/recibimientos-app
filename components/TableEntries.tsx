import { useMemo, useContext } from 'react'
import { PaginationTable } from '@/components';
import { LoadDataTables } from '@/components/ui'
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography } from '@mui/material'

import { usePagination } from '@/hooks';
import { DataContext } from '@/context/data';

export const TableEntries = () => {



    const { entriesData, handleChangePage } = useContext(DataContext);

    const { entries, totalEntries, totalPages, currentPage } = entriesData;

    console.log(entriesData);


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
                    {
                        isLoading
                            ? <LoadDataTables />
                            : <PaginationTable entries={data?.entries!} />
                    }

                    {(emptyRows > 0 && isLoading === false) && (
                        <TableRow style={{ height: 53.02 * emptyRows, padding: 0 }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}

                </TableBody>
                <TableFooter>

                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={data?.totalEntries!}
                            rowsPerPage={10}
                            rowsPerPageOptions={[]}
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
