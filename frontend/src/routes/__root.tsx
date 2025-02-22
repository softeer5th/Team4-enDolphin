import type { QueryClient } from '@tanstack/react-query';
import { 
  createRootRouteWithContext, 
  HeadContent,
  Outlet } from '@tanstack/react-router';
import { lazy } from 'react';

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
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => (
    <>
      <GlobalNavBar />
      <ErrorPage />
    </>
  ),
  head: () => ({
    meta: [
      {
        title: '언제만나',
      },
      { 
        name: 'description', 
        content: '당신과 모두의 일정을 하나로 연결해 가장 완벽한 약속 시간을 찾아드려요\n당신과 모두의 시간을 위해, 지금 바로 시작하세요.', 
      },
    ],
  }),
});