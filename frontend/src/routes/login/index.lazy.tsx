import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import { LoginLink } from '@/layout/GlobalNavBar/buttons';
import LoginPage from '@/pages/LoginPage';

const Login = () => (
  <>
    <GlobalNavBar>
      <LoginLink />
    </GlobalNavBar>
    <LoginPage />
  </>
);

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

