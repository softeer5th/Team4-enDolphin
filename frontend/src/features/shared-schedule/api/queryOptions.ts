import type { OngoingQueryType } from '../model';
import { schedulesApi } from '.';
import { querykeys } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: querykeys.upcoming,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
  },
  ongoing: (page: number, size: number, type: OngoingQueryType) => ({
    queryKey: querykeys.ongoing(page, size, type),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, type),
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: querykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
  }),
};