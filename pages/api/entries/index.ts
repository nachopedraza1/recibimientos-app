import type { NextApiRequest, NextApiResponse } from 'next';

import { format } from '@/utils';
import { Entry } from '@/models'
import { db } from '@/database';

import { PaginationData } from '@/interfaces';

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

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    await db.connect();

    /* try { */
    const [
        rows,
        totalRows,
    ] = await Promise.all([
        Entry.find()
            .sort({ createdAt: -1 })
            .select('name amount createdAt -_id')
            .skip((page - 1) * perPage)
            .limit(perPage),
        Entry.find().count(),
    ]);

    /*  await db.disconnect(); */

    const totalAmount = rows.reduce((value, current) => current.amount + value, 0);

    const formatRows = rows.map(({ name, amount, createdAt }) => {
        return {
            name,
            createdAt: JSON.stringify(createdAt).slice(1, 11),
            amount: `$${format(amount)}`
        }
    })

    return res.status(200).json({
        rows: formatRows,
        totalRows,
        totalAmount: `$${format(totalAmount)}`,
    });
    /*   } catch (error) {
          console.log(error);
          await db.disconnect();
          return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
      } */
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

