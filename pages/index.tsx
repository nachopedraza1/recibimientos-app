import { NextPage } from 'next';
import { MainLayout } from '@/components/layouts';
import { SectionHome, SectionAbout, SectionEntries, SectionExpenses } from '@/components/sections';

const Landing: NextPage = () => {

  return (
    <MainLayout title='Recibimientos CAB'>
      <SectionHome />
      <SectionEntries />
      <SectionExpenses />
      <SectionAbout />
    </MainLayout>
  )
}

export default Landing;
