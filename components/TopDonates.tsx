import { FC } from 'react';

import { CustomDivider } from '@/components/ui';
import { Box, Grid, Typography } from '@mui/material'

import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TopDonates: FC = () => {

    return (
        <Grid container justifyContent="center" alignItems="end" gap={3} p={4} data-aos="fade-down" data-aos-delay="300">
            <Grid item xs={12} md={3} className='top-box'>
                <Typography variant='h5' mb={3}> Juan Alvarez </Typography>
                <Typography >Total de aportes: 32</Typography>
                <Typography mb={2} textAlign="center">Total Aportado:</Typography>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main">$ 11.000</Typography>
                </Box>
                <span className='toptwo-donate'></span>
            </Grid>

            <Grid item xs={12} md={3} className='top-box'>
                <Box className="cont-destacado" >
                    <Typography textAlign="center" fontWeight={600} mt={0.8}> MÁS APORTO </Typography>
                </Box>
                <Box className="triangle" />
                <Typography variant='h5' mb={3}> Aldana Suarez </Typography>
                <Box mb={2} textAlign="center">
                    <FontAwesomeIcon icon={faTrophy} color='#08b8ef' size='2x' />
                    <Typography >Total de aportes: 12</Typography>
                    <Typography >Total Aportado:</Typography>
                </Box>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main">$ 26.000</Typography>
                </Box>
                <span className='top-donate'></span>
            </Grid>

            <Grid item xs={12} md={3} className='top-box'>
                <Typography variant='h5' mb={3}> Andres Cuello </Typography>
                <Typography >Total de aportes: 2</Typography>
                <Typography mb={2} textAlign="center">Total Aportado:</Typography>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main">$ 15.000</Typography>
                </Box>
                <span className='toptwo-donate'></span>
            </Grid>
        </Grid>
    )
}
