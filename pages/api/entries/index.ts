import type { NextApiRequest, NextApiResponse } from 'next';

import { format } from '@/utils';
import { Entry } from '@/models'
import { db } from '@/database';

import { PaginationData } from '@/interfaces';
import { getSession } from 'next-auth/react';

type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(req, res)

        case 'POST':
            return createEntries(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}


const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = getSession({ req });

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    await db.connect();

    try {

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Entry.find()
                .sort({ createdAt: -1 })
                .select('name amount createdAt method status -_id')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean(),
            Entry.find().count(),
            Entry.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ]);

        /* await db.disconnect(); */

        const publicRows = rows.map(row => {
            return {
                ...row,
                createdAt: JSON.stringify(row.createdAt).slice(1, 11),
                amount: `$${format(row.amount)}`
            }
        })

        return res.status(200).json({
            rows: publicRows,
            totalRows,
            totalAmount: `$${format(totalAmount[0].total)}`,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
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
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}

