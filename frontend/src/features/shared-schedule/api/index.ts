import { request } from '@/utils/fetch';

import type { OngoingSchedulesResponse, UpcomingSchedulesResponse } from '../model';
import { 
  FinishedSchedulesResponseSchema, 
  OngoingSchedulesResponseSchema,
  UpcomingSchedulesResponseSchema, 
} from '../model';
import type { FinishedSchedulesResponse, OngoingQueryType } from '../model/finishedSchedules';

const ENDPOINT_PREFIX = '/api/v1/schedules';

export const schedulesApi = {
  getUpcomingSchedules: async (): Promise<UpcomingSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/upcoming');
    const validData = UpcomingSchedulesResponseSchema.parse(response.data);
    return validData;
  },
  getOngoingSchedules: async (
    page: number,
    size: number,
    type: OngoingQueryType,
  ): Promise<OngoingSchedulesResponse> => {
    const response = await request.get(ENDPOINT_PREFIX + '/ongoing', {
      params: {
        page: page.toString(),
        size: size.toString(),
        type: type,
      },
    });
    const validData = OngoingSchedulesResponseSchema.parse(response.data);
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
    const validData = FinishedSchedulesResponseSchema.parse(response.data);
    return validData;
  },
};