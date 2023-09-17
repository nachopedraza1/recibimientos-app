import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { alertSnack } from '@/utils';
import { OrderResponseBody } from '@paypal/paypal-js';
import axios, { isAxiosError } from 'axios';


export const usePayment = () => {

    const router = useRouter();

    const session: any = useSession();

    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [urlMercadoPago, setUrlMercadoPago] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const mercadoPagoPayment = async (amount: string) => {

        if (!session.data?.user) return;

        setSelected(amount);
        setIsLoading(true);

        try {
            const { data } = await axios.post('/api/mercadopago/checkout', {
                amount: parseInt(amount),
                payerName: session.data.user.name,
                userId: session.data.user._id
            });
            setUrlMercadoPago(data.url);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            if (isAxiosError(error)) {
                alertSnack(error.response?.data.message, 'error');
            }
        }
    }



    const paypalPayment = async (details: OrderResponseBody) => {

        if (!session.data?.user) return;

        if (details.status !== 'COMPLETED') {
            return alertSnack('No hay pago en Paypal', 'error');
        }

        setIsLoading(true)

        try {

            await axios.post('/api/paypal/checkout', {
                paymentId: details.id,
                payerName: session.data.user.name,
                userId: session.data.user._id,
            });

            router.push('/history').then(() => router.reload());

        } catch (error) {
            setIsLoading(false);
            if (isAxiosError(error)) {
                alertSnack(error.response?.data.message, 'error');
            }
        }
    }

    return {
        isAuthenticated: session.data?.user,
        mercadoPagoPayment,
        urlMercadoPago,
        paypalPayment,
        isLoading,
        selected,
    }
}
