import { NextPage } from 'next';

import { CustomDivider } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { Header, TopDonates, SectionDonate } from '@/components';
import { Container, Grid, Typography } from '@mui/material';

const Landing: NextPage = () => {

  return (
    <MainLayout title='Inicio | Recibimientos CAB'>

      <Header />

      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          textAlign="center"
          data-aos="fade"
        >

          <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold'>
            Más
            <Typography fontSize={{ xs: 39, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
              aportaron
            </Typography>
          </Typography>

          <span className="mini-divider" />
          <Typography variant="h6" mb={5} >
            A través de este espacio, queremos rendir homenaje a todos los hinchas que hacen posible estos increíbles recibimientos y que demuestran que el fútbol va más allá de los resultados en la cancha.
          </Typography>

          <TopDonates />

          <CustomDivider type='recibimientos' />

          <SectionDonate />

        </Grid >
      </Container>
    </MainLayout>
  )
}

export default Landing;
