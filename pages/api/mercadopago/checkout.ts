import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';
import { CreatePreferencePayload, PreferenceItem } from 'mercadopago/models/preferences/create-payload.model';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences';

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

    const { value } = req.body;

    const preference: CreatePreferencePayload = {
        items: [{
            title: 'Aporte Recibimientos CAB',
            unit_price: value,
            quantity: 1,
        }],
        auto_return: 'approved',
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000",
        },
        notification_url: `http://localhost:3000/api/mercadopago/notify`,
    }

    try {
        const response = await mercadopago.preferences.create(preference);
        return res.status(200).json({ url: response.body.init_point })
    } catch (error) {
        return res.status(400).json({ message: 'Error when creating preference.' })
    }
}
