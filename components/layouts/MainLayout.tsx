import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Navbar, Footer } from '@/components/ui';


interface Props {
    title: string,
    description?: string,
    children: ReactNode,
    containerClass?: string,
}

export const MainLayout: FC<Props> = ({ children, title, description, containerClass }) => {

    const { asPath } = useRouter();

    return (
        <>
            <Head>
                <title> {title} </title>
                <meta name="og:title" content={title} />
                <meta name="description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            {!asPath.includes('/auth') && <Navbar />}

            <main className={containerClass || ''}>
                {children}
            </main>

            {!asPath.includes('/auth') && <Footer />}
        </>
    )
}
