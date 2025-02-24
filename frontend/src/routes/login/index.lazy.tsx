import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import LoginPage from '@/pages/LoginPage';

const Login = () => (
  <>
    <GlobalNavBar />
    <LoginPage />
  </>
);

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

