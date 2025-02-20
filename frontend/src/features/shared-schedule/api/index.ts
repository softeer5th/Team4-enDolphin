import { MINUTE_IN_MILLISECONDS } from '@/utils/date';
import { request } from '@/utils/fetch';

import type {
  AttendType,
  OngoingSchedulesResponse,
  UpcomingSchedulesResponse, 
} from '../model';
import { 
  FinishedSchedulesResponseSchema, 
  OngoingSchedulesResponseSchema,
  UpcomingSchedulesResponseSchema, 
} from '../model';
import type { FinishedSchedulesResponse } from '../model/finishedSchedules';

const ENDPOINT_PREFIX = '/api/v1/schedules';
export const ONGOING_SCHEDULE_DETAIL_GC_TIME = 1 * MINUTE_IN_MILLISECONDS;

export const schedulesApi = {
  getUpcomingSchedules: async (): Promise<UpcomingSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/upcoming');
    const parsedData = UpcomingSchedulesResponseSchema.parse(response);
    return parsedData;
  },
  getOngoingSchedules: async (
    page: number,
    size: number,
    attendType: AttendType,
  ): Promise<OngoingSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/ongoing', {
      params: {
        page: page.toString(),
        size: size.toString(),
        attendType: attendType,
      },
    });
    const parsedData = OngoingSchedulesResponseSchema.parse(response);
    return parsedData;
  },
  getFinishedSchedules: async (
    page: number,
    size: number,
    year: number,
  ): Promise<FinishedSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/finished', {
      params: {
        page: page.toString(),
        size: size.toString(),
        year: year.toString(),
      },
    });
    const parsedData = FinishedSchedulesResponseSchema.parse(response);
    return parsedData;
  },
};
