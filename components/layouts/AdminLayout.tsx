import Head from "next/head";
import { FC, ReactNode } from "react";
import { NavbarAdmin } from "../ui/NavbarAdmin";

interface Props {
    children: ReactNode;
}

export const AdminLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Admin Panel | Recibimientos CAB</title>
                <meta name="og:title" content={'Admin Panel | Recibimientos CAB'} />
                <meta name="description" content={'Admin panel | Recibimientos CAB'} />
                <meta name="og:description" content={'Admin panel | Recibimientos CAB'} />
                <meta name="og:image" content="/favicon.png" />
            </Head>

            <NavbarAdmin />

            <main>
                {children}
            </main>
        </>
    )
}
