import type { NextApiRequest, NextApiResponse } from 'next'
import { Config } from '@/models';
import { db } from '@/database';

type Data =
    | { message: string }
    | { activeMatch: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getConfigs(req, res);

        default:
            return res.status(200).json({ message: 'Method not allowed' });
    }

}

const getConfigs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        await db.connect();

        const configs = await Config.findOne().select('activeMatch -_id').lean();

        return res.status(200).json({ activeMatch: configs?.activeMatch! })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }

}