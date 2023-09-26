import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { Expense } from '@/models';
import { format } from '@/utils';
import { db } from '@/database';

import { PaginationData } from '@/interfaces';

type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getExpenses(req, res);

        case 'POST':
            return createExpenses(req, res);

        case 'DELETE':
            return deleteExpenses(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}

const getExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    await db.connect();

    try {

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Expense.find()
                .sort({ createdAt: -1 })
                .select('name amount createdAt _id')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean(),
            Expense.find().count(),
            Expense.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ]);

        /* await db.disconnect(); */

        const formatRows = rows.map(({ name, amount, createdAt, _id }) => {
            return {
                id: _id,
                name,
                createdAt: JSON.stringify(createdAt).slice(1, 11),
                amount: `$${format(amount)}`
            }
        });

        return res.status(200).json({
            rows: formatRows,
            totalRows,
            totalAmount: `$${format(totalAmount[0].total)}`,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }
}


const createExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { item = '', amount = '' } = req.body;

    if (item.length <= 3 || item.length > 35) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    if (amount.length < 3 || amount.length > 20) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });


    try {
        await db.connect();
        const expense = new Expense({ name: item, amount });
        await expense.save();
        /* await db.disconnect(); */

        return res.status(200).json({ message: 'Gasto registrado con éxito.' })

    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}

const deleteExpenses = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    try {
        await db.connect();

        const expense = await Expense.findById(id)

        if (!expense) {
            return res.status(500).json({ message: 'No hay gasto con este ID.' })
        }

        await expense.deleteOne();

        return res.status(200).json({ message: 'Eliminado con éxito.' })

    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}