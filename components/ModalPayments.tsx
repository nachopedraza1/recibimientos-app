import { FC, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import { UiContext } from "@/context/ui";

import { Modal, Backdrop, Fade, Box, Typography, Button, Link as MuiLink } from "@mui/material";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '550px',
    bgcolor: '#16171b',
    border: '2px solid #08b8ef',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface Props {
    title: '',
}

const values = [250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000];

export const ModalPayments: FC = () => {

    const session = useSession();

    const { modalPaymentState, toggleModalPayment } = useContext(UiContext);

    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [urlPay, setUrlPay] = useState<string>('')


    const handleSelect = async (value: number) => {

        if (!session.data?.user) return;

        setSelected(value)
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/mercadopago/checkout', { value, payerName: session.data.user.name })
            setUrlPay(data.url);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <div>
            <Modal
                open={modalPaymentState}
                onClose={toggleModalPayment}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalPaymentState}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>

                            <Typography variant="h4" fontWeight={600} textAlign="center">
                                Mercado Pago
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
                                            onClick={() => handleSelect(amount)}
                                        >
                                            <Typography> Aporte de ${amount} </Typography>
                                            <Image width={45} height={45} src='/logo.png' alt='Recibimientos Cab Mercado Pago' />
                                        </Box>
                                    ))
                                }
                            </Box>

                            <Typography>
                                Seras redireccionado a Mercado Pago para completar tu aporte.
                            </Typography>

                            <Button
                                variant='contained'
                                disabled={!selected || isLoading || !session.data?.user}
                                href={urlPay}
                                className='checkout-mp'
                                startIcon={<Image width={50} height={50} src='/mercadopago-short.png' alt='Recibimientos Cab MercadoPago' />}>
                                Pagar con MercadoPago
                            </Button>

                            {!session.data?.user &&
                                <Typography textAlign="center">
                                    Debes
                                    <MuiLink component={Link} href='/auth/login' mx={0.6} fontWeight={600} >
                                        iniciar sesión
                                    </MuiLink>
                                    para continuar.
                                </Typography>
                            }

                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}