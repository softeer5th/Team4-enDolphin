import { request } from '@/utils/fetch';

import type { RequestGoogleLoginResponse } from '../model';

export const requestGoogleLogin = async (): Promise<RequestGoogleLoginResponse> => {
  const response = await request.get('/api/v1/google');
  return response;
};