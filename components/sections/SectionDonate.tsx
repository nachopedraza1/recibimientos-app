import { FC } from 'react';
import { SectionLayout } from '../layouts';
import { Box, Button, Grid, Typography } from '@mui/material';

export const SectionDonate: FC = () => {
    return (
        <SectionLayout idSection='ingresos' className='bg-donate'>
            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="65vh"
                textAlign="center"
                color="white"
            >

                <Typography variant="h3">
                    Aportar
                </Typography>
                <span className="mini-divider" />
                <Typography variant="h6" mb={5} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur autem natus nemo inventore.
                    Explicabo commodi qui, ex expedita ab unde.
                </Typography>

                <Box display='flex' justifyContent='center' >
                    <Button variant='contained' className='mercadopago-btn' />
                    <Button variant='contained' className='paypal-btn' />
                </Box>

            </Grid>
        </SectionLayout>
    )
}
