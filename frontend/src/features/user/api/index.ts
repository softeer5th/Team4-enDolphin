import { request } from '@/utils/fetch';

import { UserInfoSchema } from '../model';

export const userApi = {
  getUserInfo: async () => {
    const response = await request.get('/api/v1/user/current');
    const parsedData = UserInfoSchema.parse(response);
    return parsedData;
  },
};
