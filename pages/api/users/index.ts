import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { format, isEmail } from '@/utils';

import { PaginationData } from '@/interfaces';


type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res);

        case 'POST':
            return registerUser(req, res);

        case 'PUT':
            return updateAccount(req, res);

        default:
            return res.status(200).json({ message: 'Método no válido.' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

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

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body;

    const lowercaseName = name.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    if (lowercaseName.length <= 6 || lowercaseName.length > 20) return res.status(400).json({ message: 'Bad request - Name' })
    if (isEmail(lowercaseEmail) || lowercaseEmail.length > 35) return res.status(400).json({ message: 'Bad request - Email' })
    if (password.length < 6 || password.length > 25) return res.status(400).json({ message: 'Bad request - Password' })

    await db.connect();

    const isExist = await User.findOne({ $or: [{ email: lowercaseEmail }, { name: lowercaseName }], })

    if (isExist) {
        /* await db.disconnect(); */
        return res.status(400).json({ message: 'Ya existe un usuario registrado con estos datos.' })
    }

    try {

        const user = new User({
            name: lowercaseName,
            email: lowercaseEmail,
            role: 'user',
            totalDonated: 0,
            password: bcrypt.hashSync(password)
        })

        await user.save({ validateBeforeSave: true });
        /* await db.disconnect(); */

        return res.status(200).json({ message: 'Usuario registrado.' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error, revisar logs del servidor.' })
    }
}


const updateAccount = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', id } = req.body;

    const lowercaseName = name.toLowerCase();

    if (lowercaseName.length <= 6 || lowercaseName.length > 20) return res.status(400).json({ message: 'Error al procesar la solicitud' });
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' })

    try {
        await db.connect();

        const exist = await User.findOne({ name: lowercaseName });

        if (exist) return res.status(400).json({ message: 'Ya existe un usuario con este nombre.' });

        await User.findByIdAndUpdate(id, { name: lowercaseName });

        return res.status(200).json({ message: 'Usuario actualizado.' });
    } catch (error) {
        return res.status(400).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }
}