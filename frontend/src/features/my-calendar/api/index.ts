import { request } from '@/utils/fetch';

import type { PersonalEventDTO, PersonalEventResponse } from '../model';

export const personalEventApi = {
  getPersonalEvents: async (
    { startDateTime, endDateTime }: Pick<PersonalEventDTO, 'startDateTime' | 'endDateTime'>,
  ): Promise<PersonalEventResponse> => {
    const response = await request.get('/api/v1/personal-event', {
      params: { 
        startDateTime: `${startDateTime}T00:00:00`, 
        endDateTime: `${endDateTime}T00:00:00`,
      },
    });
    return response.data;
  },
};