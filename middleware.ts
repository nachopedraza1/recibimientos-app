import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone();
    const requestUrl = req.nextUrl.pathname;


    const routesPay = ['/api/paypal/checkout', '/api/mercadopago/checkout'];
    if (routesPay.includes(requestUrl)) {

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


    const routesAdmin = ['/api/entries', '/api/expenses','/api/matches'];
    if (routesAdmin.includes(requestUrl)) {

        if (req.method === 'GET') return NextResponse.next();

        if (!session || session.user.role !== 'admin') {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return NextResponse.next();
    }



    if (requestUrl.includes('/api/users')) {
        if (req.method === 'POST') return NextResponse.next();

        if (!session) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }



    if (requestUrl.includes('/auth')) {

        if (session) {
            url.pathname = '/';
            return NextResponse.redirect(url)
        }

        return NextResponse.next();
    }


    
    if (requestUrl.includes('/api/admin')) {

        if (!session || session.user.role !== 'admin') {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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
        '/admin',//Only auth admins
        '/auth/login', //Only unauth
        '/auth/register',//Only unauth
        '/api/paypal/checkout', //Only auth
        '/api/mercadopago/checkout',//Only auth

        '/api/admin',// => //Private GET
        '/api/entries',// =>Private POST && DELETE
        '/api/expenses',// =>Private POST && DELETE
        '/api/matches',// =>Private POST && DELETE && PUT
        '/api/users', //Private POST && PUT
    ],
};

