import { request } from '@/utils/fetch';

import type { RequestGoogleLoginUrlResponse } from '../model';

export const requestGoogleLoginUrl = async (): Promise<RequestGoogleLoginUrlResponse> => {
  const response = await request.get('/api/v1/google');
  return response;
};
