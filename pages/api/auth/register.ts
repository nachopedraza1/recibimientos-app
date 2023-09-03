import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { isEmail } from '@/utils';
import { IUser } from '@/interfaces';

type Data =
    | { message: string }
    | { user: IUser }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            return res.status(400).json({ message: 'Invalid method.' })
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body;

    if (name.length <= 2) return res.status(400).json({ message: 'Bad request - Name' })
    if (isEmail(email)) return res.status(400).json({ message: 'Bad request - Email' })
    if (password.length < 6) return res.status(400).json({ message: 'Bad request - Password' })

    await db.connect();

    const isExist = await User.findOne({ email })

    if (isExist) {
        await db.disconnect();
        return res.status(400).json({ message: 'Email already exists.' })
    }

    const user = new User({
        name,
        email,
        role: 'visit',
        password: bcrypt.hashSync(password)
    })

    try {
        await user.save({ validateBeforeSave: true })
        await db.disconnect();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error, check logs in server.' })
    }

    const { _id, role } = user;

    return res.status(200).json({ user: { _id, name, email, role } });
}
