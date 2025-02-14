import { request } from '@/utils/fetch';

import type { RequestGoogleLoginUrlResponse } from '../model';

export const loginApi = {
  getGoogleLoginUrl: async (): Promise<RequestGoogleLoginUrlResponse> => {
    const response = await request.get('/api/v1/google');
    return response;
  },
};