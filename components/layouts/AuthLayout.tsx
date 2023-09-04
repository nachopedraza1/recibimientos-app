import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";

import styles from '@/pages/auth/auth.module.css'
import { Grid } from "@mui/material";

interface Props {
    children: ReactNode;
    title: string;
}

export const AuthLayout: NextPage<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title> {title} </title>
                <meta name="og:title" content={title} />
                <meta name="description" content={'¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:description" content={'¡Bienvenidos a nuestra página de Recibimientos de la Hinchada del Club Atlético Belgrano!'} />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            <main>
                <Grid container className={`${styles.container}`}>
                    <Grid item xs={6} />

                    <Grid item xs={4} className={styles.box_auth} data-aos="fade-in">
                        {children}
                    </Grid>
                </Grid>
            </main >
        </>
    )
}