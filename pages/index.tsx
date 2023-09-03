import { NextPage } from 'next';
import { MainLayout } from '@/components/layouts';
import { SectionHome, SectionAbout, SectionEntries, SectionExpenses, SectionDonate, SectionNotices } from '@/components/sections';

const Landing: NextPage = () => {

  return (
    <MainLayout >
      <SectionHome />
      <SectionAbout />
      <SectionDonate />
      <SectionEntries />
      <SectionExpenses />
      <SectionNotices />
    </MainLayout>
  )
}

export default Landing;
