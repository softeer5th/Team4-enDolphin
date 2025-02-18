import { useQuery } from '@tanstack/react-query';

import type { FinishedSchedulesResponse, UpcomingSchedulesResponse } from '../model';
import type { AttendType, OngoingSchedulesResponse } from '../model/ongoingSchedules';
import { sharedSchedulesQueryOptions } from './queryOptions';

export const useUpcomingQuery = () => useQuery<UpcomingSchedulesResponse>(
  sharedSchedulesQueryOptions.upcoming,
);

export const useOngoingQuery = (page: number, size: number, type: AttendType) => 
  useQuery<OngoingSchedulesResponse>(
    sharedSchedulesQueryOptions.ongoing(page, size, type),
  );

export const useFinishedQuery = (page: number, size: number, year: number) =>
  useQuery<FinishedSchedulesResponse>(
    sharedSchedulesQueryOptions.finished(page, size, year),
  );
