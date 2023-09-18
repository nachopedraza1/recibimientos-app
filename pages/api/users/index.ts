import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '@/interfaces';

type Data =
    | { message: string }
    | IUser[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res)

        default:
            return res.status(200).json({ message: 'Example' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    const tops = req.query.tops;

    if (tops) {

        /*  try { */
        await db.connect();

        const tops = await User.find().select('name totalDonated countDonations')
            .sort({ totalDonated: -1 })
            .limit(3)

        /* await db.disconnect(); */

        return res.status(200).json(tops);

        /*         } catch (error) {
                    console.log(error);
                    await db.disconnect();
                    return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
                } */
    }


    try {
        await db.connect();
        const users = await User.find()
            .select('name email role totalDonated countDonations')
            .skip((page - 1) * perPage)
            .sort({ createdAt: -1 })
            .limit(perPage)
        await db.disconnect();

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }
}