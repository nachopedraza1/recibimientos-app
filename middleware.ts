import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone();
    
    if (!session) {
        url.pathname = '/';
        return NextResponse.redirect(url)
    }

    if (session.user.role !== 'admin') {
        url.pathname = '/';
        return NextResponse.redirect(url)
    }

    NextResponse.next();
}

export const config = {
    matcher: ['/admin'],
};

