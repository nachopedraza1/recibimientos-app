
import bcrypt from 'bcryptjs';
import { db } from "@/database"
import { User } from '@/models';

import { IUser } from '@/interfaces';

export const checkUserEmailPassword = async (email: string, password: string): Promise<IUser | null> => {

    await db.connect();
    const user = await User.findOne({ email });
    /* await db.disconnect(); */

    if (!user) {
        /* await db.disconnect(); */
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    const { _id, name, role } = user;

    return { _id, name, email, role };
}

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string, image: string) => {

    await db.connect();
    const user = await User.findOne({ $or: [{ email: oAuthEmail }, { name: oAuthName }], })

    if (user) {
        /* await db.disconnect(); */
        const { _id, name, email, role } = user;
        return { _id, name, email, role, image };
    }

    const newUser = new User({
        name: oAuthName.toLowerCase(),
        email: oAuthEmail,
        password: '@',
        role: 'user'
    });
    await newUser.save();
    /* await db.disconnect(); */

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role, image };

}