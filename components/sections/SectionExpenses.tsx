import { FC } from 'react';

import { usePaginationRequest } from '@/hooks';

import { CustomTable } from '@/components';
import { Blob, CustomDivider } from '@/components/ui';
import { SectionLayout } from "@/components/layouts"
import { Grid, Typography } from "@mui/material"


export const SectionExpenses: FC = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('expenses');

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

                <CustomTable
                    headRows={['Fecha', 'Producto', 'Monto']}
                    handleChangePage={handleChangePage}
                    isLoading={isLoading}
                    results={results}
                    totalText='Gastos totales:'
                />

            </Grid>

            <Blob width="50%" top="15%" left="1%" />
            <Blob width="50%" top="55%" left="75%" />
        </SectionLayout>
    )
}
