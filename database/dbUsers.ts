
import bcrypt from 'bcryptjs';
import { db } from "./"

import { User } from '@/models';
import { IUser } from '@/interfaces';

export const checkUserEmailPassword = async (email: string, password: string): Promise<IUser | null> => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        await db.disconnect();
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    const { _id, name } = user;

    return { _id, name, email }
}