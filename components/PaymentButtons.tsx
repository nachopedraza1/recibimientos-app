import { FC, useContext } from 'react';

import { UiContext } from '@/context/ui';

import { Box, Grid, Typography } from '@mui/material';
import { MercadoPagoModal, PaypalModal } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

export const PaymentButtons: FC = () => {

    const { toggleModal } = useContext(UiContext);

    return (
        <Grid
            container
            data-aos="fade"
            direction="column"
            justifyContent="center"
            textAlign="center"
            color="white"
            pt={10}
        >
            <Typography variant="h3">
                Aportar a
                <Typography variant="h3" component='span' color="primary.main" mx={2}>
                    recibimientos CAB
                </Typography>
            </Typography>

            <span className="mini-divider" />
            
            <Typography variant="h6" mb={2} >
                Puedes realizar tu aporte a travez de las siguientes plataformas de pago,
                o puedes optar por realizar una transferencia bancaria. Gracias, Pirata!
            </Typography>

            <Box display='flex' justifyContent='center'>
                <Box className='mercadopago-btn' onClick={() => toggleModal('mercadopago')} />
                <Box className='paypal-btn' onClick={() => toggleModal('paypal')} />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" gap={1} letterSpacing={1} mt={2}>
                <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
                <Box>
                    <Typography> Alias: RECIBIMIENTOSCAB1905 </Typography>
                    <Typography> CBU: 0110213230021325584197 </Typography>
                </Box>
            </Box>

            <MercadoPagoModal />
            <PaypalModal />

        </Grid>
    )
}
