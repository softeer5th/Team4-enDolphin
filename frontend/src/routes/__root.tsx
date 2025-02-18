import type { QueryClient } from '@tanstack/react-query';
import { 
  createRootRouteWithContext, 
  Outlet, 
} from '@tanstack/react-router';
import { lazy } from 'react';

import { NotificationProvider } from '@/components/Notification/NotificationProvider';
import { defaultENV } from '@/envconfig';
import GlobalNavBar from '@/layout/GlobalNavBar';
import ErrorPage from '@/pages/ErrorPage';

export interface QueryClientContext {
  queryClient: QueryClient;
}

const TanStackRouterDevtools =
  defaultENV.MODE === 'production'
    ? () => null
    : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRouteWithContext<QueryClientContext>()({
  component: () => (
    <NotificationProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </NotificationProvider>
  ),
  notFoundComponent: () => (
    <>
      <GlobalNavBar />
      <ErrorPage />
    </>
  ),
});