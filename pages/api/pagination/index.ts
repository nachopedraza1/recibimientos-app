import type { NextApiRequest, NextApiResponse } from 'next';

import { Entry, Expense } from '@/models';
import { format } from '@/utils';
import { db } from '@/database';

import { ResponsePagination } from '@/interfaces';

type Data =
    | { message: string }
    | ResponsePagination

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getExpenses(req, res);

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
            rowsEntries,
            totalRowsEntries,
            totalAmountEntries,
            rowsExpenses,
            totalRowsExpenses,
            totalAmountExpenses
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
            }]),

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


        const formatEntriesRow = rowsEntries.map(({ name, amount, createdAt }) => {
            return {
                name,
                createdAt: JSON.stringify(createdAt).slice(1, 11),
                amount: `$${format(amount)}`
            }
        })

        const formatExpensesRow = rowsExpenses.map(({ name, amount, createdAt }) => {
            return {
                name,
                createdAt: JSON.stringify(createdAt).slice(1, 11),
                amount: `$${format(amount)}`
            }
        })


        return res.status(200).json({
            totalRowsEntries,
            rowsEntries: formatEntriesRow,
            totalAmountEntries: `$${format(totalAmountEntries[0].total)}`,

            totalRowsExpenses,
            rowsExpenses: formatExpensesRow,
            totalAmountExpenses: `$${format(totalAmountExpenses[0].total)}`,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error en la paginación. Revisar logs del servidor.' });
    }
}