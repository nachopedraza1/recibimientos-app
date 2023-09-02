import { NextPage } from 'next';
import { MainLayout } from '@/components/layouts';
import { SectionHome, SectionAbout, SectionEntries, SectionExpenses, SectionContact } from '@/components/sections';

const HomePage: NextPage = () => {
  return (
    <MainLayout title='Recibimientos CAB'>
      <SectionHome />
      <SectionAbout />
      <SectionEntries />
      <SectionExpenses />
      <SectionContact />
    </MainLayout>
  )
}

export default HomePage;
