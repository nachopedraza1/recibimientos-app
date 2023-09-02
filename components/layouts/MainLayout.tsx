import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../ui/';


interface Props {
    title: string,
    description?: string,
    children: ReactNode,
}

export const MainLayout: FC<Props> = ({ children, title, description }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="og:title" content={title} />
                <meta name="description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            <Navbar />

            <main>
                {children}
            </main >

            <Footer />
        </>
    )
}
