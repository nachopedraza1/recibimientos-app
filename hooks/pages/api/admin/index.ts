import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { format } from '@/utils';
import { Entry, Expense, User } from '@/models';

import { DashboardStats } from '@/interfaces';

type Data =
    | { message: string }
    | DashboardStats

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getDashboard(req, res);

        default:
            return res.status(200).json({ message: 'Método inválido.' });
    }
}

const getDashboard = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        await db.connect();

        const [
            entriesMercadoPago,
            entriesTransfer,
            entriesPaypal,
            totalEntries,
            totalUser,
            totalCollected,
            totalExpenses,
        ] = await Promise.all([
            Entry.find({ method: 'mercadopago' }).count(),
            Entry.find({ method: 'transferencia' }).count(),
            Entry.find({ method: 'paypal' }).count(),
            Entry.find().count(),
            User.find().count(),
            Entry.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }]),
            Expense.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }])
        ])
        
        /* await db.disconnect(); */

        return res.status(200).json({
            entriesMercadoPago,
            entriesTransfer,
            entriesPaypal,
            totalEntries,
            totalUser,
            totalCollected: `$${format(totalCollected[0].total)}`,
            totalExpenses: `$${format(totalExpenses[0].total)}`
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }
}
