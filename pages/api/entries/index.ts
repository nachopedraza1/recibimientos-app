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

    const totalUser = await Entry.find().count();

    const entries = await Entry.find().skip((page - 1) * perPage).limit(perPage);

    return res.status(200).json({
        entries,
        currentPage: page,
        totalPages: Math.ceil(totalUser / perPage),
    });

}