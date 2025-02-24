import './theme/index.css';
import './theme/reset.css';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { GlobalNotifications } from './components/Notification/GlobalNotification';
import { routeTree } from './routeTree.gen';
import { handleError } from './utils/error/handleError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
    mutations: {
      onError: handleError,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
});

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
  scrollRestoration: true,
  scrollRestorationBehavior: 'instant',
  getScrollRestorationKey: (location) => {
    const paths = ['/home'];
    return paths.includes(location.pathname)
      ? location.pathname
      : location.state.key!;
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    candidate?: {
      adjustCount: number;
      startDateTime: string;
      endDateTime: string;
      selectedParticipantIds?: number[];
    };
    upcomingScheduleDetail?: {
      title: string;
      startDateTime: string;
      endDateTime: string;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <GlobalNotifications />
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>,
);
