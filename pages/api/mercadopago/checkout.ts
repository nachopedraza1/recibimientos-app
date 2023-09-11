import type { NextApiRequest, NextApiResponse } from 'next';

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
            res.status(400).json({ message: 'Method not allowed.' })
    }

}

const createPreference = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { value, payerName } = req.body;

    const url = process.env.SITE_URL

    try {
        const preference: CreatePreferencePayload = {
            items: [{
                title: 'Aporte Recibimientos CAB',
                unit_price: value,
                quantity: 1,
            }],
            payer: {
                name: payerName,
            },
            auto_return: 'approved',
            back_urls: {
                success: url,
                failure: url,
                pending: url,
            },
            notification_url: `${url}/api/mercadopago/notify`,
        }
        const response = await mercadopago.preferences.create(preference);
        return res.status(200).json({ url: response.body.init_point })
    } catch (error) {
        return res.status(400).json({ message: 'Error when creating preference.' })
    }
}
