import type { NextApiRequest, NextApiResponse } from 'next';

import { Expense } from '@/models';
import { db } from '@/database';

import { Rows } from '@/interfaces';

type Data =
    | { rows: Rows[], totalRows: number, totalAmount: number }
    | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createExpenses(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}


const createExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name, amount } = req.body;

    if (name.length <= 3 || name.length > 20) return res.status(400).json({ message: 'Bad request - Name' });
    if (amount.length <= 3 || amount.length > 20) return res.status(400).json({ message: 'Bad request - Amount' })

    try {
        await db.connect();
        const expense = new Expense({ name, amount });
        await expense.save();
        await db.disconnect();

        return res.status(200).json({ message: 'Gasto registrado con éxito.' })

    } catch (error) {
        return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}