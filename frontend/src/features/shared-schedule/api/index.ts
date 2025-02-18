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

export const schedulesApi = {
  getUpcomingSchedules: async (): Promise<UpcomingSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/upcoming');
    const validData = UpcomingSchedulesResponseSchema.parse(response);
    return validData;
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
    const validData = OngoingSchedulesResponseSchema.parse(response);
    return validData;
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
    const validData = FinishedSchedulesResponseSchema.parse(response);
    return validData;
  },
};
