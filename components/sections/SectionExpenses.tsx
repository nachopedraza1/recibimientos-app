import { FC } from 'react';

import { Blob, CustomDivider } from '@/components/ui';
import { SectionLayout } from "@/components/layouts"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"


const CustomPaper = styled(Paper)((props) => ({
    background: "#1d1b1b",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
}))

export const SectionExpenses: FC = () => {
    return (
        <SectionLayout idSection="gastos">

            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="90vh"
                textAlign="center"
                pt={6}
                data-aos="fade"
            >
                <CustomDivider type='recibimientos' />

                <Typography variant="h3" mt={5}>
                    Informe de Gastos
                </Typography>

                <span className="mini-divider" />
                <Typography variant="h6" mb={5}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, inventore incidunt in architecto sed veniam quod saepe officiis quam necessitatibus nisi, aliquam doloremque dicta tempore facilis.
                </Typography>

                <TableContainer component={CustomPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center" >Fecha</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Producto</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Monto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {[...Array(10)].map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">2023-06-01</TableCell>
                                    <TableCell align="center">Matafuego</TableCell>
                                    <TableCell align="center">$3500</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    <Typography variant="h5" fontWeight='bold' m={3}>
                        Gasto total:
                        <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                            $120.200
                        </Typography>
                    </Typography>

                </TableContainer>
            </Grid>

            <Blob width="50%" top="15%" left="1%" />
            <Blob width="50%" top="55%" left="75%" />
        </SectionLayout>
    )
}
