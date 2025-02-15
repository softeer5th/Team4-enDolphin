import { request } from '@/utils/fetch';

import type { DateRangeParams, PersonalEventRequest, PersonalEventResponse } from '../model';

export const personalEventApi = {
  getPersonalEvent: async (
    { startDate, endDate }: DateRangeParams,
  ): Promise<PersonalEventResponse[]> => {
    const response = await request.get('/api/v1/personal-event', {
      params: { startDate, endDate },
    });
    return response.data;
  },
  postPersonalEvent: async (body: PersonalEventRequest): Promise<PersonalEventResponse> => {
    const response = await request.post('/api/v1/personal-event', { body });
    return response;
  },
};