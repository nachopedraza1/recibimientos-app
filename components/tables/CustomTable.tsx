import { FC } from 'react';

import { LoadDataTables } from '@/components/ui'
import { RowsPaginated } from '@/components/tables';
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography, styled, Paper, Box } from '@mui/material';

import { PaginationData } from '@/interfaces';


const CustomPaper = styled(Paper)((props) => ({
    background: "#1d1b1b",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
}));

interface Props {
    results: PaginationData,
    isLoading?: boolean,
    headRows: string[],
    totalText?: string,
    hiddenTotal?: boolean,
    tableType: 'entriesPublic' | 'entriesPrivate' | 'expensesPublic' | 'usersPrivate' | 'matchesPrivate',
    handleChangePage: (event: unknown, newPage: number) => void
}

export const CustomTable: FC<Props> = (
    { handleChangePage,
        isLoading,
        results,
        headRows,
        totalText,
        tableType,
        hiddenTotal = false }) => {


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
                            : <RowsPaginated
                                rows={results.rows}
                                page={results.page!}
                                tableType={tableType}
                            />
                    }
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={results.totalRows}
                            rowsPerPage={10}
                            rowsPerPageOptions={[]}
                            page={results.page!}
                            onPageChange={handleChangePage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

            <Typography variant="h5" fontWeight='bold' textAlign='center' m={3} display={!hiddenTotal ? '' : 'none'} className='fadeIn'>
                <Box>
                    {totalText}
                    <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                        {results.totalAmount}
                    </Typography>
                </Box>
            </Typography>

        </TableContainer>
    )
}
