
import type { AttendType } from '../model';
import { schedulesApi } from '.';
import { sharedScheduleQuerykeys } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: sharedScheduleQuerykeys.upcoming,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
  },
  ongoing: (page: number, size: number, attendtype: AttendType) => ({
    queryKey: sharedScheduleQuerykeys.ongoing(page, size, attendtype),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, attendtype),
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: sharedScheduleQuerykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
  }),
};
