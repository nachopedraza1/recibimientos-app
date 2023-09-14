
import { usePagination } from '@/hooks';
import { format } from '@/utils';

import { RowsPaginated } from '@/components';
import { LoadDataTables } from '@/components/ui'
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography } from '@mui/material'



export const TableEntries = () => {

    const { handleChangePage, isLoading, results } = usePagination('entries');

    const emptyRows = Math.max(0, ((results.page - 1) * 10) - results.rows.length);

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
                            : <RowsPaginated entries={results.rows} />
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
                            count={results.totalRows}
                            rowsPerPage={10}
                            rowsPerPageOptions={[]}
                            page={results.page - 1}
                            onPageChange={handleChangePage}
                            sx={{ borderBottom: "none" }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

            <Typography variant="h5" fontWeight='bold'>
                Total Recaudado:
                <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                    ${format(results.totalAmount)}
                </Typography>
            </Typography>

        </TableContainer>
    )
}
