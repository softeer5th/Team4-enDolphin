import type { QueryClient } from '@tanstack/react-query';

import { sharedSchedulesQueryOptions } from './queryOptions';

export const prefetchUpcomingSchedules = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(sharedSchedulesQueryOptions.upcoming);
};

export const prefetchOngoingSchedules = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(sharedSchedulesQueryOptions.ongoing(1, 10, 'ALL'));
};

export const prefetchFinishedSchedules = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(
    sharedSchedulesQueryOptions.finished(1, 10, new Date().getFullYear()),
  );
};
