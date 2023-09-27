import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import mercadopago from 'mercadopago';

type Data =
    | { message: string }
    | { url: string }

mercadopago.configure({ access_token: process.env.SECRET_MP! });

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createPreference(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' })
    }

}

const createPreference = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { amount, payerName, userId } = req.body;

    if (payerName.length < 3) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }

    const url = process.env.SITE_URL;

    try {
        const preference: CreatePreferencePayload = {
            items: [{
                title: 'Aporte Recibimientos CAB',
                unit_price: amount,
                quantity: 1,
                id: userId
            }],
            payer: {
                name: payerName,
            },
            auto_return: 'approved',
            back_urls: {
                success: `${url}/history`,
                failure: url,
                pending: url,
            },
            notification_url: `${url}/api/mercadopago/notify?source_news=webhooks`,
        }

        const response = await mercadopago.preferences.create(preference);

        return res.status(200).json({ url: response.body.init_point })

    } catch (error) {
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' })
    }
}
