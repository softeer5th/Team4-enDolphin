import { MINUTE_IN_MILLISECONDS } from '@/utils/date';

import type { AttendType } from '../model';
import { schedulesApi } from '.';
import { sharedScheduleQuerykeys } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: sharedScheduleQuerykeys.upcoming,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
    staleTime: 4 * MINUTE_IN_MILLISECONDS,
    cacheTime: 5 * MINUTE_IN_MILLISECONDS, 
  },
  ongoing: (page: number, size: number, attendtype: AttendType) => ({
    queryKey: sharedScheduleQuerykeys.ongoing(page, size, attendtype),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, attendtype),
    staleTime: 4 * MINUTE_IN_MILLISECONDS,
    cacheTime: 5 * MINUTE_IN_MILLISECONDS, 
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: sharedScheduleQuerykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
    staleTime: 4 * MINUTE_IN_MILLISECONDS,
    cacheTime: 5 * MINUTE_IN_MILLISECONDS,
  }),
};
