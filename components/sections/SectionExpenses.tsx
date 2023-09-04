import { FC } from 'react';
import { SectionLayout } from "../layouts"
import { LoadDataTables } from '../entries';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export const SectionExpenses: FC = () => {
    return (
        <SectionLayout idSection="gastos">
            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="90vh"
                textAlign="center"
                pt={10}
            >

                <Typography variant="h3">
                    Informe de Gastos
                </Typography>

                <span className="mini-divider" />
                <Typography variant="h6" mb={5}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, inventore incidunt in architecto sed veniam quod saepe officiis quam necessitatibus nisi, aliquam doloremque dicta tempore facilis.
                </Typography>

                <TableContainer>
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

                    <Typography variant="h5" fontWeight='bold' mt={5}>
                        Gasto total:
                        <Typography component='span' fontWeight='bold' variant="h5" color="primary.main" ml={1}>
                            $120.200
                        </Typography>
                    </Typography>

                </TableContainer>

            </Grid>
        </SectionLayout>

    )
}
