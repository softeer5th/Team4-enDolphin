import { createFileRoute, Outlet } from '@tanstack/react-router';

import MainLayout from './@components/MainLayout';

const Layout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export const Route = createFileRoute('/_main')({
  component: Layout,
});
