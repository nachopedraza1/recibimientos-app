import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { format } from '@/utils';
import { Entry, Match } from '@/models'
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

        case 'DELETE':
            return deleteEntry(req, res);

        default:
            return res.status(400).json({ message: 'Método inválido.' });
    }
}


const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const search = req.query.search as string || '';
    const perPage = 10;

    await db.connect();

    try {

        const activeMatch = await Match.findOne({ active: true });

        if (!activeMatch) return res.status(400).json({ message: 'No hay recibimientos activos.' })

        const [
            rows,
            totalRows,
            totalAmount
        ] = await Promise.all([
            Entry.find({
                category: activeMatch.name,
                name: {
                    $ne: 'administrador',
                    $regex: new RegExp(search, 'i')
                }
            })
                .sort({ createdAt: -1 })
                .select('name amount createdAt method status _id')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean(),

            Entry.find({
                category: activeMatch.name,
                name: {
                    $ne: 'administrador',
                    $regex: new RegExp(search, 'i')
                }
            }).count(),

            Entry.aggregate([
                {
                    $match: { category: activeMatch.name }
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

        const formatRows = rows.map(row => {

            return {
                ...row,
                createdAt: JSON.stringify(row.createdAt).slice(1, 11),
                amount: `$${format(row.amount)}`
            }
        })

        const formattedTotalAmount = `$${format(totalAmount[0] ? totalAmount[0].total - activeMatch.iva : 0)}`;

        return res.status(200).json({
            rows: formatRows,
            totalRows,
            totalAmount: formattedTotalAmount,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }
}

const createEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', amount = '', method = '' } = req.body;

    if (name.length <= 3 || name.length > 35) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    if (amount.length < 3 || amount.length > 20) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    const validMethods = ['mercadopago', 'paypal', 'transferencia'];

    if (!validMethods.includes(method)) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    try {
        await db.connect();

        const category = await Match.findOne({ active: true });

        const newEntry = new Entry({
            name: name.toLowerCase(),
            amount,
            method,
            category: category?.name,
            status: 'COMPLETED',
        });
        await newEntry.save();
        await db.disconnect();

        return res.status(200).json({ message: 'Aporte registrado con éxito.' })

    } catch (error) {
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}


const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    try {
        await db.connect();

        const entry = await Entry.findById(id)

        if (!entry) {
            return res.status(500).json({ message: 'No hay aporte con este ID.' })
        }

        await entry.deleteOne();

        return res.status(200).json({ message: 'Eliminado con éxito.' })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }

}

