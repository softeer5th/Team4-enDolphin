import { MINUTE_IN_MILLISECOND } from '@/utils/date';

import type { AttendType } from '../model';
import { schedulesApi } from '.';
import { sharedScheduleQuerykeys } from './keys';

export const sharedSchedulesQueryOptions = {
  upcoming: {
    queryKey: sharedScheduleQuerykeys.upcoming,
    queryFn: () => schedulesApi.getUpcomingSchedules(),
    staleTime: 4 * MINUTE_IN_MILLISECOND,
    cacheTime: 5 * MINUTE_IN_MILLISECOND, 
  },
  ongoing: (page: number, size: number, attendtype: AttendType) => ({
    queryKey: sharedScheduleQuerykeys.ongoing(page, size, attendtype),
    queryFn: () => schedulesApi.getOngoingSchedules(page, size, attendtype),
    staleTime: 4 * MINUTE_IN_MILLISECOND,
    cacheTime: 5 * MINUTE_IN_MILLISECOND, 
  }),
  finished: (page: number, size: number, year: number) => ({
    queryKey: sharedScheduleQuerykeys.finished(page, size, year),
    queryFn: () => schedulesApi.getFinishedSchedules(page, size, year),
    staleTime: 4 * MINUTE_IN_MILLISECOND,
    cacheTime: 5 * MINUTE_IN_MILLISECOND,
  }),
};
