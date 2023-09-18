import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import axios from 'axios';

import { db } from '@/database';
import { Entry, User } from '@/models';

import { PaypalOrderStatusResponse } from '@/interfaces';

type Data =
    { message: string }
    | PaypalOrderStatusResponse


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return payOrder(req, res);

        default:
            return res.status(200).json({ message: 'Example' })
    }

}


const getPaypalBarerToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {

        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL!, body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return null;
        } else {
            console.log(error);
            return null;
        }
    }

}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    const { paymentId = '', payerName = '', userId = '' } = req.body;

    if (payerName.length < 3 || paymentId.length < 3) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }

    const paypayBarerToken = await getPaypalBarerToken();

    if (!paypayBarerToken) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }


    try {
        const { data } = await axios.get<PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${paypayBarerToken}`
            }
        })

        const resp = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        const valueBlue = resp.data.blue.value_sell as number;

        if (data.status !== 'COMPLETED') {
            return res.status(400).json({ message: 'El pago se encuentra pendiente.' })
        }

        await db.connect();

        const entry = await Entry.findOne({ paymentId })

        if (!entry) {

            const amountInArs = parseInt(data.purchase_units[0].amount.value) * valueBlue

            const newEntry = new Entry({
                userId,
                name: payerName,
                amount: amountInArs,
                method: 'paypal',
                status: data.status,
                paymentId
            });

            await User.findByIdAndUpdate(userId, {
                $inc: { totalDonated: amountInArs }
            });

            await newEntry.save();
            await db.disconnect();
            return res.status(200).json({ message: "Pago completado con éxito." })
        }

        entry.status = data.status;
        await entry.save();
        await db.disconnect();

        return res.status(200).json({ message: "Pago actualizado con éxito." })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Algo ha salido mal. Por favor, comuníquese con un administrador." })
    }

}