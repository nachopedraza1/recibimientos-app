import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone();

    if (req.nextUrl.pathname.includes('/api')) {
        console.log(req.nextUrl.pathname);

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


    if (!session || session.user.role !== 'admin') {
        url.pathname = '/';
        return NextResponse.redirect(url)
    }

    NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/api/paypal/checkout','/api/mercadopago/checkout'],
};

