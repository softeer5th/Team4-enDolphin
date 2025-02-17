import type { OngoingQueryType } from '../model';
import { schedulesApi } from '.';
import { sharedScheduleQuerykeys } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: sharedScheduleQuerykeys.upcoming,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
  },
  ongoing: (page: number, size: number, type: OngoingQueryType) => ({
    queryKey: sharedScheduleQuerykeys.ongoing(page, size, type),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, type),
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: sharedScheduleQuerykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
  }),
};
