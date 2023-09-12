import { FC, useContext, useState } from 'react';
import Image from 'next/image';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { UiContext } from '@/context/ui';
import { usePayment } from '@/hooks';

import { Box, Typography } from "@mui/material";
import { ModalLayout } from '@/components/layouts';


const values = ['1', '5', '10', '15', '20', '30', '40', '60', '80', '100', '150', '200', '300'];

export const PaypalModal: FC = () => {

    const { modalStatus } = useContext(UiContext);

    const [selected, setSelected] = useState<string | undefined>(undefined);

    const { paypalPayment, isLoading, isAuthenticated } = usePayment();

    return (
        <ModalLayout modalType='paypal' modalStatus={modalStatus.paypal!} >

            <Typography variant="h4" fontWeight={600} textAlign="center">
                PayPal
            </Typography>

            <span className='mini-divider' />

            <Typography>
                Por favor, selecciona uno de la lista:
            </Typography>

            <Box height='250px' paddingRight={2} display='flex' flexDirection='column' gap={1.5} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
                {
                    values.map((amount) => (
                        <Box
                            key={amount}
                            className={amount === selected ? 'donate-box selected' : 'donate-box'}
                            onClick={() => setSelected(amount)}
                        >
                            <Typography> {amount} USD </Typography>
                            <Image width={45} height={45} src='/logo.png' alt='Recibimientos Cab Mercado Pago' />
                        </Box>
                    ))
                }
            </Box>

            <Typography>
                Seras redireccionado a Paypal para completar tu aporte.
            </Typography>

            <PayPalButtons
                style={{ color: 'blue' }}
                disabled={!selected || isLoading || !isAuthenticated}
                forceReRender={[selected]}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: 'Aporte Recibimientos CAB',
                                amount: {
                                    value: selected!,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                        paypalPayment(details);
                    });
                }}
            />


        </ModalLayout >
    );
}