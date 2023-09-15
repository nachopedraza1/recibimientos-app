import { FC } from 'react';

import { format } from '@/utils';

import { RowsPaginated } from '@/components';
import { LoadDataTables } from '@/components/ui'
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography, styled, Paper } from '@mui/material'

import { Results } from '@/interfaces';

const CustomPaper = styled(Paper)((props) => ({
    background: "#1d1b1b",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
}))


interface Props {
    results: Results,
    isLoading?: boolean,
    headRows: string[],
    totalText?: string,
    handleChangePage: (event: unknown, newPage: number) => void
}

export const CustomTable: FC<Props> = ({ handleChangePage, isLoading, results, headRows, totalText }) => {


    const emptyRows = Math.max(0, ((results.page - 1) * 10) - results.rows.length);


    return (
        <TableContainer component={CustomPaper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headRows.map(text => (
                            <TableCell key={text} sx={{ fontWeight: 'bold' }} align="center"> {text} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        isLoading
                            ? <LoadDataTables />
                            : <RowsPaginated rows={results.rows} />
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
                        />
                    </TableRow>
                </TableFooter>
            </Table>

            {
                results.totalAmount &&
                (
                    <Typography variant="h5" fontWeight='bold' textAlign='center' m={3}>
                        {totalText}
                        <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                            ${format(results.totalAmount)}
                        </Typography>
                    </Typography>
                )
            }

        </TableContainer>
    )
}
