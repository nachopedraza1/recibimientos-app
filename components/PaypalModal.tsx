import { FC, useContext, useState } from 'react';
import Image from 'next/image';

import { UiContext } from '@/context/ui';
import { usePayment } from '@/hooks';

import { Box, Typography } from "@mui/material";
import { ModalLayout } from '@/components/layouts';


const values = [250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000];

export const PaypalModal: FC = () => {

    const { modalStatus } = useContext(UiContext);


    return (
        <ModalLayout modalType='paypal' modalStatus={modalStatus.paypal!} >

            <Typography variant="h4" fontWeight={600} textAlign="center">
                Paypal
            </Typography>

            <span className='mini-divider' />

            <Typography>
                Por favor, selecciona uno de la lista:
            </Typography>



            <Typography>
                Seras redireccionado a Paypal para completar tu aporte.
            </Typography>



        </ModalLayout >
    );
}