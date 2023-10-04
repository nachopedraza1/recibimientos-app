import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Entry } from '@/models';
import { format } from '@/utils';

import { PaginationData } from '@/interfaces';

type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    let { query = '', page = 1 } = req.query;
    const perPage = 10;

    if (query.length === 0) return res.status(400).json({ message: 'No se especifico el query de búsqueda.' });

    query = query.toString().toLowerCase();

    try {

        await db.connect();

        const [
            rows,
            totalRows,
        ] = await Promise.all([
            Entry.find({ $text: { $search: query } })
                .sort({ createdAt: -1 })
                .select('name amount createdAt method status _id')
                .skip((Number(page) - 1) * perPage)
                .limit(perPage)
                .lean(),
            Entry.find({ $text: { $search: query } }).count(),
        ]);

        const formatRows = rows.map(row => {
            return {
                ...row,
                createdAt: JSON.stringify(row.createdAt).slice(1, 11),
                amount: `$${format(row.amount)}`
            }
        })

        return res.status(200).json({
            rows: formatRows,
            totalRows,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }
}