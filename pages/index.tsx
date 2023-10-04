import { NextPage } from 'next';

import { MainLayout } from '@/components/layouts';
import { TopTenTable } from '@/components/tables';
import { Blob, CustomDivider } from '@/components/ui';
import { Header, TopDonates, SectionDonate, InstagramPosts } from '@/components';
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
            A través de este espacio, queremos rendir homenaje a todos los hinchas que hacen posible estos increíbles recibimientos y que demuestran que el fútbol va más allá de los resultados en la cancha,
            a continuación destacaremos las personas y organizaciones que más aportaron a
            <Typography variant="h6" component='span' color='primary.main' fontWeight={600}> Recibimientos CAB.</Typography>
          </Typography>

          <TopDonates />

          <TopTenTable />

          <SectionDonate />

          <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' mt={8}>
            Ultimas
            <Typography fontSize={{ xs: 34, md: 46 }} fontWeight='bold' component={'span'} color='primary' mx={1}>
              noticias CAB
            </Typography>
          </Typography>

          <CustomDivider />

          <InstagramPosts />

        </Grid >

        <Blob width="30%" top="10%" left="74%" />
        <Blob width="50%" top="24%" left="0%" />
        <Blob width="50%" top="52%" left="75%" />
        <Blob width="30%" top="70%" left="0%" />
        <Blob width="50%" top="85%" left="75%" />
      </Container>
    </MainLayout>
  )
}

export default Landing;
