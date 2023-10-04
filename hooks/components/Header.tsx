import { FC } from 'react';

import { CustomDivider } from '@/components/ui';
import { Box, Button, Grid, Typography } from '@mui/material';

export const Header: FC = () => {

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="100vh" className='bg-home'>

            <Grid item xs={12} textAlign="center">

                <Typography variant="h3" display={{ xs: 'none', sm: 'block' }} data-aos="fade-down">
                    Página oficial de Recibimientos CAB
                </Typography>

                <Box display={{ xs: 'block', sm: 'none' }} data-aos="fade-down">
                    <Typography variant="h4">
                        Página oficial
                    </Typography>

                    <Typography variant="h4" color='primary.main'>
                        Recibimientos CAB
                    </Typography>

                    <CustomDivider />
                </Box>


                <Typography fontSize={{ xs: 18, sm: 22 }} data-aos="fade-in" data-aos-delay="600">
                    Con tu aporte hacemos los recibimientos
                    <Typography fontSize={{ xs: 18, sm: 22 }} component='span' color='primary.main' mx={1} fontWeight='bold'>
                        MAS GRANDES
                    </Typography>
                    del país!
                </Typography>

                <Button
                    data-aos="fade-up" data-aos-delay="800"
                    variant='contained'
                    size='large'
                    sx={{ mt: 1 }}
                    href='#payment'
                >
                    Realiza tu aporte ahora
                </Button>
            </Grid>
        </Grid>
    )
}
