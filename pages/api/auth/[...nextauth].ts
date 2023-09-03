
import { dbUsers } from "@/database";
import { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'custom login',
            credentials: {
                email: { label: 'Email:', type: 'email'},
                password: { label: 'Password:', type: 'password' }
            }, async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            },
        })
    ],

    session: {
        maxAge: 1800, // <-- expire session (30m)
        strategy: 'jwt',
        updateAge: 600, // <-- revalidate token (10m)
    },

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions);