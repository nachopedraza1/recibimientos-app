import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as MuiLink, TableRow, Typography } from '@mui/material';

export const EmptyRows = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}
        >
            <Image src='/logo-loading.png' width={120} height={120} alt='Recibimientos CAB' />
            <Typography variant="h5" fontWeight={600}>
                Aun no hay resultados disponibles.
            </Typography>
            <Typography>
                Puedes acceder al historial de recibimientos
                <MuiLink component={Link} href={'/recibimientos'} ml={0.5} >
                    aqui.
                </MuiLink>
            </Typography>
        </div>
    )
}
