import type { NextApiRequest, NextApiResponse } from 'next';

import { Expense } from '@/models';
import { db } from '@/database';

import { Rows } from '@/interfaces';

type Data =
    | { rows: Rows[], totalRows: number, totalAmount: number }
    | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getExpenses(req, res);
        case 'POST':
            return createExpenses(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}

const getExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    try {
        await db.connect();

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Expense.find()
                .sort({ createdAt: -1 })
                .select('name amount createdAt -_id')
                .skip((page - 1) * perPage)
                .limit(perPage),

            Expense.find().count(),

            Expense.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ]);
        await db.disconnect();

        if (rows.length === 0) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay resultados.' });
        }

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