import React from 'react';
import Image from 'next/image';
import { TableRow, Typography } from '@mui/material';

export const EmptyRows = () => {
    return (
        <TableRow
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Image src='/logo-loading.png' width={120} height={120} alt='Recibimientos CAB' />
            <Typography variant="h5" fontWeight={600}>
                Aun no hay resultados disponibles.
            </Typography>
            <Typography>
                Puedes acceder al historial de recibimientos aqui.
            </Typography>
            <span className='mini-divider'></span>
        </TableRow>
    )
}
