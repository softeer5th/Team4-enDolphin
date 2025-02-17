import { useQuery } from '@tanstack/react-query';

import type { UpcomingSchedulesResponse } from '../model';
import type { FinishedSchedulesResponse, OngoingQueryType } from '../model/finishedSchedules';
import type { OngoingSchedulesResponse } from '../model/ongoingSchedules';
import { schedulesApi } from '.';
import { querykeys } from './keys';

export const useUpcomingQuery = () => useQuery<UpcomingSchedulesResponse>({
  queryKey: querykeys.upcoming,
  queryFn: () => schedulesApi.getUpcomingSchedules(),
});

export const useOngoingQuery = (page: number, size: number, type: OngoingQueryType) => 
  useQuery<OngoingSchedulesResponse>({
    queryKey: querykeys.ongoing(page, size, type),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, type),
  });

export const useFinishedQuery = (page: number, size: number, year: number) =>
  useQuery<FinishedSchedulesResponse>({
    queryKey: querykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
  });
  
