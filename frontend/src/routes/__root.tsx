import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy } from 'react';

import { defaultENV } from '@/envconfig';

import Error from './@components/Error';

const TanStackRouterDevtools =
  defaultENV.MODE === 'production'
    ? () => null
    : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: Error,
});