import { FC } from 'react';

import { LoadDataTables } from '@/components/ui'
import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer, styled, Paper, Typography } from '@mui/material';
import useSWR from 'swr';
import { format } from '@/utils';



const CustomPaper = styled(Paper)((props) => ({
    background: "#1d1b1b",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    marginBottom: '40px',
}));

interface Tops {
    _id: string
    name: string
    totalDonated: number,
    countDonations: number,
}

export const TopTenTable: FC = () => {

    const { data, isLoading } = useSWR<Tops[]>('/api/users/tops?limit=10');

    return (
        <TableContainer component={CustomPaper}>

            <Table>
                <TableHead>
                    <TableRow>
                        {['', 'nombre', 'aportes', 'total aportado'].map(text => (
                            <TableCell key={text} sx={{ fontWeight: 'bold' }} align="center"> {text} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        isLoading
                            ? <LoadDataTables />
                            :
                            <>
                                {data?.slice(3, 10).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center" scope="row">
                                            <Typography variant='h6' fontWeight={600} color='primary.main'>
                                                {index + 4 + '°'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" scope="row">
                                            {row.countDonations}
                                        </TableCell>
                                        <TableCell align="center" scope="row">
                                            {`$${format(row.totalDonated)}`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                    }
                </TableBody>

            </Table>
        </TableContainer >
    )
}
