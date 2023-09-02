import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { SectionLayout } from '../layouts';

export const SectionHome = () => {
    return (
        <SectionLayout idSection='inicio'>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h3" color="white">
                        Página oficial de recibimientos CAB
                    </Typography>
                    <Typography variant="h6" color="white" >
                        Con tu aporte hacemos los recibimientos
                        <Typography variant='h6' component='span' color='primary.main' mx={1} fontWeight='bold'>
                            MAS GRANDES
                        </Typography>
                        del pais.
                    </Typography>
                    <Button variant='contained' size='large' sx={{ mt: 1 }}>
                        Realiza tu aporte ahora
                    </Button>
                </Grid>
            </Grid>
            <div className='bg-fixed'></div>
        </SectionLayout>
    )
}
