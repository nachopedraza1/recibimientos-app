import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry, Match } from '@/models';
import { db } from '@/database';


interface Tops {
    name: string,
    totalDonated: number,
    countDonations: number,
}

type Data =
    | { message: string }
    | Tops[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getTops(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' })
    }

}

const getTops = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const limit = parseInt(req.query.limit as string) || 3;

    await db.connect();

    try {

        const activeMatch = await Match.findOne({ active: true });

        if (!activeMatch) return res.status(400).json({ message: 'No hay recibimientos activos.' })

        const findTops = await Entry.aggregate([
            {
                $match: { category: activeMatch.name }
            },
            {
                $group: {
                    _id: "$name",
                    totalAmount: { $sum: "$amount" },
                    totalCount: { $sum: 1 },
                }
            },
            {
                $sort: { totalAmount: -1 }
            },
            {
                $limit: limit
            }
        ]);

        const tops = findTops.map(top => {
            return {
                name: top._id,
                totalDonated: top.totalAmount,
                countDonations: top.totalCount,
            }
        })

        /* await db.disconnect(); */

        return res.status(200).json(tops);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }

}