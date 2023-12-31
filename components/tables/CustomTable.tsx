import { FC, useState } from 'react';

import { usePaginationRequest } from '@/hooks';

import { SearchBar } from '@/components';
import { LoadDataTables } from '@/components/ui'
import { RowsPaginated } from '@/components/tables';
import { Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableContainer, Typography, styled, Paper, Box } from '@mui/material';


const CustomPaper = styled(Paper)((props) => ({
    background: "#1d1b1b",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: '40px',
}));

interface Props {
    headRows: string[],
    totalText?: string,
    hiddenTotal?: boolean,
    searchBar?: boolean
    requestType: 'entries' | 'expenses' | 'users' | 'matches' | 'users/history',
    tableType: 'entriesPublic' | 'entriesPrivate' | 'expensesPublic' | 'usersPrivate' | 'matchesPrivate',
}

export const CustomTable: FC<Props> = (
    {
        headRows,
        totalText,
        tableType,
        requestType,
        searchBar = false,
        hiddenTotal = false }) => {

    const [query, setQuery] = useState('')
    const { handleChangePage, isLoading, results } = usePaginationRequest(requestType, query);

    const onSearch = ({ query }: { query: string }) => setQuery(query)

    return (
        <>
            {searchBar && <SearchBar onSearch={onSearch} />}

            <TableContainer component={CustomPaper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            {headRows.map(text => (
                                <TableCell key={text} sx={{ fontWeight: 'bold' }} align="center"> {text} </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ position: 'relative' }}>
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
                                count={results.totalRows || 0}
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
            </TableContainer >
        </>
    )
}
