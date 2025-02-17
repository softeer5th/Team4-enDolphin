import { request } from '@/utils/fetch';

import type { OngoingQueryType } from '../model/finishedSchedules';

const ENDPOINT_PREFIX = '/api/v1/schedules';

export const schedulesApi = {
  getUpcomingSchedules: async () => request.get(ENDPOINT_PREFIX + '/upcoming'),
  getOngoingSchedules: async (page: number, size: number, type: OngoingQueryType) => 
    request.get(ENDPOINT_PREFIX + '/ongoing', {
      params: {
        page: page.toString(),
        size: size.toString(),
        type: type,
      },
    }),
  getFinishedSchedules: async (page: number, size: number, year: number) => 
    request.get(ENDPOINT_PREFIX + '/finished', {
      params: {
        page: page.toString(),
        size: size.toString(),
        year: year.toString(),
      },
    }),
};