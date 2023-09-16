import type { NextApiRequest, NextApiResponse } from 'next';

import { Entry } from '@/models'
import { db } from '@/database';

import { Rows } from '@/interfaces';

type Data =
    | { rows: Rows[], totalRows: number, totalAmount: number }
    | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createEntries(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}

const createEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name, amount } = req.body;

    if (name.length <= 3 || name.length > 20) return res.status(400).json({ message: 'Bad request - Name' });
    if (amount.length <= 3 || amount.length > 20) return res.status(400).json({ message: 'Bad request - Amount' })

    try {
        await db.connect();
        const entry = new Entry({ name, amount });
        await entry.save();
        await db.disconnect();

        return res.status(200).json({ message: 'Aporte registrado con éxito.' })

    } catch (error) {
        return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}
