import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import MainLayout from '@/layout/MainLayout';
import { isLogin } from '@/utils/auth';
import { setLastRoutePath } from '@/utils/route';

const Layout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export const Route = createFileRoute('/_main')({
  beforeLoad: async ({ location }) => {
    if (!isLogin()) {
      setLastRoutePath(location.pathname);
      throw redirect({ to: '/login' });
    }
  },
  component: Layout,
});
