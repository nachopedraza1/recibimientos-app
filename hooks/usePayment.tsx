import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const usePayment = () => {

    const session = useSession();

    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [urlPayment, setUrlPayment] = useState<string>('')

    const mercadoPagoPayment = async (value: number) => {

        if (!session.data?.user) return;

        setSelected(value)
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/mercadopago/checkout', { value, payerName: session.data.user.name })
            setUrlPayment(data.url);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return {
        isAuthenticated: session.data?.user,
        mercadoPagoPayment,
        urlPayment,
        isLoading,
        selected,
    }
}
