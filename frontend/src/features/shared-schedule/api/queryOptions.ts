
import type { AttendType } from '../model';
import { schedulesApi } from '.';
import { finishedQueryKey, ongoingQueryKey, upcomingQueryKey } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: upcomingQueryKey,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
  },
  ongoing: (page: number, size: number, attendtype: AttendType) => ({
    queryKey: ongoingQueryKey.detail(page, size, attendtype),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, attendtype),
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: finishedQueryKey.detail(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
  }),
};
