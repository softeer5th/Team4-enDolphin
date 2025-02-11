import { createLazyFileRoute } from '@tanstack/react-router';

import LoginPage from '@/pages/LoginPage';

const Login = () => (
  <>
    <LoginPage />
  </>
);

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

