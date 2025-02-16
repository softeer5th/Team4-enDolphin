import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import MainLayout from '@/layout/MainLayout';
import { isLogin } from '@/utils/auth';

const Layout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export const Route = createFileRoute('/_main')({
  beforeLoad: async () => {
    if (!isLogin()) {
      throw redirect({ to: '/login' });
    }
  },
  component: Layout,
});
