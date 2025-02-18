import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  createBrowserHistory, 
  createRootRouteWithContext, 
  Outlet, 
} from '@tanstack/react-router';
import { lazy } from 'react';

import { NotificationProvider } from '@/components/Notification/NotificationProvider';
import { defaultENV } from '@/envconfig';
import GlobalNavBar from '@/layout/GlobalNavBar';
import ErrorPage from '@/pages/ErrorPage';
import { setLastRoutePath } from '@/utils/route';

interface QueryClientContext {
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

const history = createBrowserHistory();
history.subscribe((subArgs) => {
  const pathname = subArgs.location.pathname;
  if (pathname !== '/login' && pathname !== '/oauth/redirect') {
    setLastRoutePath(pathname);
  }
});

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<QueryClientContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </NotificationProvider>
    </QueryClientProvider>
  ),
  notFoundComponent: () => (
    <>
      <GlobalNavBar />
      <ErrorPage />
    </>
  ), 
  context: () => ({
    queryClient,
  }),
});