import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import LandingPage from '@/pages/LandingPage';

const Landing = () => (
  <>
    <GlobalNavBar background='transparent'>
      <GlobalNavBar.LoginLink />
    </GlobalNavBar>
    <LandingPage />
  </>
);

export const Route = createFileRoute('/landing/')({
  component: Landing,
});