import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Entry } from '@/models'

type Data =
    | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    try {
        await db.connect();

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Entry.find()
                .sort({ createdAt: -1 })
                .select('name amount createdAt -_id')
                .skip((page - 1) * perPage)
                .limit(perPage),

            Entry.find().count(),

            Entry.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ]);

        await db.disconnect();


        return res.status(200).json({
            rows,
            totalRows,
            totalAmount: totalAmount[0].total,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error en la paginación. Revisar logs del servidor.' });
    }
}