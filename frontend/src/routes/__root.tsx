import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy } from 'react';

import { defaultENV } from '@/envconfig';

import ErrorPage from './@components/ErrorPage';
import GlobalHeader from './@components/GlobalHeader';
import RootContainer from './@components/RootContainer';
import RootContentWrapper from './@components/RootContentWrapper';

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
    <RootContainer>
      <GlobalHeader />
      <RootContentWrapper>
        <Outlet />
      </RootContentWrapper>
      <TanStackRouterDevtools />
    </RootContainer>
  ),
  notFoundComponent: ErrorPage,
});