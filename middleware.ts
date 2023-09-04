import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    //TODO: validations for admin panel
}

export const config = {
    matcher: ['/admin'],
};

