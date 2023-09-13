import { db } from '@/database';
import { Entry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

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

    await db.connect();
    const totalEntries = await Entry.find().lean().count();
    const entries = await Entry.find().skip((page - 1) * perPage).limit(perPage);
    await db.disconnect();

    const totalPages = Math.ceil(totalEntries / perPage);

    return res.status(200).json({
        entries,
        totalEntries,
        totalPages,
        currentPage: page,
    });

}