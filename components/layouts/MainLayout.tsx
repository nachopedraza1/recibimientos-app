import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar, Footer } from '../ui/';


interface Props {
    children: ReactNode,
}

export const MainLayout: FC<Props> = ({ children }) => {

    return (
        <>
            <Head>
                <title>Recibimientos CAB</title>
                <meta name="og:title" content={'Recibimientos CAB'} />
                <meta name="description" content={'¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:description" content={'¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
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
