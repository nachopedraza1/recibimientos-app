import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Entry, User } from '@/models';
import { format } from '@/utils';

import { PaginationData } from '@/interfaces';
import { isValidObjectId } from 'mongoose';

interface Tops {
    name: string,
    totalDonated: number,
    countDonations: number,
}

type Data =
    | { message: string }
    | PaginationData
    | Tops[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res);

        case 'PUT':
            return updateAccount(req, res);

        default:
            return res.status(200).json({ message: 'Example' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    const tops = req.query.tops;

    if (tops) {

        await db.connect();

        try {

            const findTops = await Entry.aggregate([
                {
                    $group: {
                        _id: "$name",
                        totalAmount: { $sum: "$amount" },
                        totalCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { totalAmount: -1 }
                },
                {
                    $limit: 3
                }

            ])

            const tops = findTops.map(top => {
                return {
                    name: top._id,
                    totalDonated: top.totalAmount,
                    countDonations: top.totalCount,
                }
            })

            /* await db.disconnect(); */

            return res.status(200).json(tops);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
        }
    }


    try {
        await db.connect();

        const [
            rows,
            totalRows,
            totalDonated
        ] = await Promise.all([
            User.find()
                .select('name email createdAt role totalDonated countDonations')
                .skip((page - 1) * perPage)
                .sort({ createdAt: -1 })
                .limit(perPage),
            User.find().count(),
            User.aggregate([{
                $group: {
                    _id: null,
                    total: { $sum: '$total' }
                }
            }])
        ])
        /* await db.disconnect(); */

        return res.status(200).json({
            rows,
            totalRows,
            totalAmount: `$${format(totalDonated[0].total)}`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }
}


const updateAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', id } = req.body;

    if (name.length <= 6 || name.length > 20) return res.status(400).json({ message: 'Error al procesar la solicitud' });
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    try {
        await db.connect();

        const exist = await User.findOne({ name });

        if (exist) return res.status(400).json({ message: 'Ya existe un usuario con este nombre.' });

        await User.findByIdAndUpdate(id, { name: name.toLowerCase() });

        return res.status(200).json({ message: 'Usuario actualizado.' });
    } catch (error) {
        return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }
}