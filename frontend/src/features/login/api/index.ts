import { request } from '@/utils/fetch';

import type { JWTResponse } from '../model';

export const loginApi = {
  getJWT: async (code: string): Promise<JWTResponse> => {
    const response = await request.post('/api/v1/login', {
      body: { code },
    });
    return response;
  },
};