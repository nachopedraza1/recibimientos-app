import { FC } from 'react';

import { useNavbar } from '@/hooks';

import { SectionLayout } from '@/components/layouts';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CustomDivider } from '../ui';

export const SectionHome: FC = () => {

    const { navigateWithoutHash } = useNavbar();

    return (
        <SectionLayout idSection='inicio' bgClass='bg-home'>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" >

                <Grid item xs={12} textAlign="center">

                    <Typography variant="h3" display={{ xs: 'none', sm: 'block' }} data-aos="fade-down">
                        Página oficial de recibimientos CAB
                    </Typography>

                    <Box display={{ xs: 'block', sm: 'none' }} data-aos="fade-down">
                        <Typography variant="h4">
                            Página oficial
                        </Typography>

                        <Typography variant="h4" color='primary.main' fontWeight='bold'>
                            Recibimientos CAB
                        </Typography>

                        <CustomDivider />
                    </Box>


                    <Typography fontSize={{ xs: 18, sm: 22 }} data-aos="fade-in" data-aos-delay="600">
                        Con tu aporte hacemos los recibimientos
                        <Typography fontSize={{ xs: 18, sm: 22 }} component='span' color='primary.main' mx={1} fontWeight='bold'>
                            MAS GRANDES
                        </Typography>
                        del pais!
                    </Typography>

                    <Button
                        data-aos="fade-up" data-aos-delay="800"
                        variant='contained'
                        size='large'
                        sx={{ mt: 1 }}
                        onClick={(e) => navigateWithoutHash(e, 'ingresos')}
                    >
                        Realiza tu aporte ahora
                    </Button>
                </Grid>
            </Grid>
        </SectionLayout>
    )
}
