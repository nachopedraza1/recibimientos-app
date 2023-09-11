import { FC, useContext } from 'react';
import { SectionLayout } from '../layouts';

import { UiContext } from '@/context/ui';

import { MercadoPagoModal, PaypalModal } from '@/components';
import { Box, Grid, Typography } from '@mui/material';

export const SectionDonate: FC = () => {

    const { toggleModal } = useContext(UiContext);

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

                <Box display='flex' justifyContent='center'>
                    <Box className='mercadopago-btn' onClick={() => toggleModal('mercadopago')} />
                    <Box className='paypal-btn' onClick={() => toggleModal('paypal')} />
                </Box>

            </Grid>

            <MercadoPagoModal />
            <PaypalModal />
        </SectionLayout>
    )
}
