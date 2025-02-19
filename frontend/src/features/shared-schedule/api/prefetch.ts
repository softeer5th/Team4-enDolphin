import type { QueryClient } from '@tanstack/react-query';

import type { AttendType } from '../model';
import { sharedSchedulesQueryOptions } from './queryOptions';

export const prefetchUpcomingSchedules = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(sharedSchedulesQueryOptions.upcoming);
};

export const prefetchOngoingSchedules = async (
  queryClient: QueryClient,
  page: number,
  size: number,
  attendType: AttendType,
) => {
  await queryClient.prefetchQuery(sharedSchedulesQueryOptions.ongoing(page, size, attendType));
};

export const prefetchFinishedSchedules = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(
    sharedSchedulesQueryOptions.finished(1, 10, new Date().getFullYear()),
  );
};
