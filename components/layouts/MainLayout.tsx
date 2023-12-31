import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Footer } from '@/components/footer';
import { NavbarDesktop, NavbarMobile } from '@/components/navigation';
import { Container, Grid } from '@mui/material';


interface Props {
    title: string,
    children: ReactNode,
    description?: string
    containerPageClass?: string,
}

export const MainLayout: FC<Props> = ({ title, children, description, containerPageClass }) => {

    const { asPath } = useRouter();

    return (
        <Grid style={{ overflow: 'hidden' }}>
            <Head>
                <title>{title || 'Recibimientos CAB'}</title>
                <meta name="description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:title" content={title || 'Recibimientos CAB'} />
                <meta name="og:description" content={description || '¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            {!asPath.includes('/auth') &&
                <>
                    <NavbarDesktop />
                    <NavbarMobile />
                </>
            }

            <main className={containerPageClass}>
                {children}
            </main>

            {!asPath.includes('/auth') && <Footer />}
        </Grid >
    )
}
