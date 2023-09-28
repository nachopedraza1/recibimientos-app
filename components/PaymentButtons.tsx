import { FC, useContext } from 'react';

import { UiContext } from '@/context/ui';

import { Box, Divider, Grid, Typography, Tooltip } from '@mui/material';
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
            id='payment'
        >

            <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold'>
                Aportar a
                <Divider component={'br'} sx={{ display: { sm: 'none' } }} />
                <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
                    Recibimientos CAB
                </Typography>
            </Typography>

            <span className="mini-divider" />

            <Typography variant="h6" mb={2} >
                Puedes realizar tu aporte a través de las siguientes plataformas de pago, o puedes optar por realizar una transferencia bancaria. ¡Gracias, Pirata!
            </Typography>

            <Box display='flex' justifyContent='center' flexWrap='wrap'>
                <Tooltip title={<Typography>Próximamente...</Typography>} arrow placement='top'>
                    <Box className='mercadopago-btn' onClick={() => toggleModal('mercadopago')} />
                </Tooltip>
                <Tooltip title={<Typography>Próximamente...</Typography>} arrow placement='top'>
                    <Box className='paypal-btn btn-disabled ' /* onClick={() => toggleModal('paypal')} */ />
                </Tooltip>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" gap={1} letterSpacing={1} mt={2}>
                <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
                <Box>
                    <Typography>Alias: RECIBIMIENTOSCAB1968</Typography>
                    <Typography>CBU: 0000003100076377822709</Typography>
                    <Typography>Titular: Facundo Gaston Quiroga</Typography>
                </Box>
            </Box>

            <MercadoPagoModal />
            <PaypalModal />

        </Grid>
    )
}
