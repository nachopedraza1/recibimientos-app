import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone();
    const requestUrl = req.nextUrl.pathname;

    if (requestUrl.includes('/api')) {
        if (!session) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return NextResponse.next();
    }


    if (requestUrl.includes('/auth')) {
        if (session) {
            url.pathname = '/';
            return NextResponse.redirect(url)
        }
        return NextResponse.next();
    }


    if (requestUrl.includes('/admin')) {

        if (!session || session.user.role !== 'admin') {
            url.pathname = '/';
            return NextResponse.redirect(url)
        }
        return NextResponse.next();
    }


}

export const config = {
    matcher: [
        '/admin',
        '/auth/login',
        '/auth/register',
        '/api/paypal/checkout',
        '/api/mercadopago/checkout',
    ],
};

