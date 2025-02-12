import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy } from 'react';

import { NotificationProvider } from '@/components/Notification/NotificationProvider';
import { defaultENV } from '@/envconfig';
import GlobalNavBar from '@/layout/GlobalNavBar';
import ErrorPage from '@/pages/ErrorPage';

const TanStackRouterDevtools =
  defaultENV.MODE === 'production'
    ? () => null
    : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </NotificationProvider>
      //
      {' '}
    </QueryClientProvider>
  ),
  notFoundComponent: () => (
    <>
      <GlobalNavBar />
      <ErrorPage />
    </>
  ), 
});