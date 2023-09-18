import { FC } from 'react';
import useSWR from 'swr';

import { CustomDivider } from '@/components/ui';
import { Box, Grid, Skeleton, Typography } from '@mui/material'

import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from '@/utils';

interface Tops {
    _id: string
    name: string
    totalDonated: number,
    countDonations: number,
}

export const TopDonates: FC = () => {

    const { data } = useSWR<Tops[]>('/api/users?tops=true');

    return (
        <Grid container justifyContent="center" alignItems="end" gap={3} p={4} data-aos="fade-down" data-aos-delay="300">
            <Grid item xs={12} md={3} className='top-box'>
                <Typography variant='h5' mb={3} textTransform='capitalize'> {!data ? <Skeleton sx={{ mx: 2 }} /> : data[1].name} </Typography>
                <Typography >Total de aportes: {!data ? '...' : data[1].countDonations} </Typography>
                <Typography mb={2} textAlign="center">Total Aportado:</Typography>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main"> {!data ? <Skeleton sx={{ mx: 2 }} /> : `$${format(data[1].totalDonated)}`} </Typography>
                </Box>
                <span className='toptwo-donate'></span>
            </Grid>

            <Grid item xs={12} md={3} className='top-box'>
                <Box className="cont-destacado" >
                    <Typography textAlign="center" fontWeight={600} mt={0.8}> MÁS APORTO </Typography>
                </Box>
                <Box className="triangle" />
                <Typography variant='h5' mb={3} textTransform='capitalize'>  {!data ? <Skeleton sx={{ mx: 2 }} /> : data[0].name} </Typography>
                <Box mb={2} textAlign="center">
                    <FontAwesomeIcon icon={faTrophy} color='#08b8ef' size='2x' />
                    <Typography >Total de aportes: {!data ? '...' : data[0].countDonations} </Typography>
                    <Typography >Total Aportado:</Typography>
                </Box>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main">{!data ? <Skeleton sx={{ mx: 2 }} /> : `$${format(data[0].totalDonated)}`}  </Typography>
                </Box>
                <span className='top-donate'></span>
            </Grid>

            <Grid item xs={12} md={3} className='top-box'>
                <Typography variant='h5' mb={3} textTransform='capitalize'>  {!data ? <Skeleton sx={{ mx: 2 }} /> : data[2].name}  </Typography>
                <Typography >Total de aportes: {!data ? '...' : data[2].countDonations} </Typography>
                <Typography mb={2} textAlign="center">Total Aportado:</Typography>
                <CustomDivider />
                <Box textAlign="center" mt={2}>
                    <Typography variant="h5" color="primary.main">{!data ? <Skeleton sx={{ mx: 2 }} /> : `$${format(data[2].totalDonated)}`}  </Typography>
                </Box>
                <span className='toptwo-donate'></span>
            </Grid>
        </Grid>
    )
}
