import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'
;
import { db } from '@/database';
import { Entry } from '@/models';
import { format } from '@/utils';

import { PaginationData } from '@/interfaces';

type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    const session: any = await getSession({ req });

    if (!session) {
        return res.status(400).json({ message: 'No autorizado.' })
    }

    try {
        await db.connect();

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Entry.find({ name: session.user.name })
                .sort({ createdAt: -1 })
                .select('name amount createdAt method status _id')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean(),

            Entry.find({ name: session.user.name }).count(),

            Entry.aggregate([
                {
                    $match: { name: session.user.name }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ])
        ]);

        /* await db.disconnect(); */

        const history = rows.map(row => {

            return {
                ...row,
                createdAt: JSON.stringify(row.createdAt).slice(1, 11),
                amount: `$${format(row.amount)}`
            }
        })

        const formattedTotalAmount = `$${format(totalAmount[0] ? totalAmount[0].total : 0)}`;

        return res.status(200).json({
            rows: history,
            totalRows,
            totalAmount: formattedTotalAmount
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Algo salio mal.' })
    }
}