import { request } from '@/utils/fetch';

import type { UserInfo, UserNicknameRequest } from '../model';
import { UserInfoSchema } from '../model';

export const userApi = {
  getUserInfo: async (): Promise<UserInfo> => {
    const response = await request.get('/api/v1/user/current');
    const parsedData = UserInfoSchema.parse(response);
    return parsedData;
  },
  patchNickname: async ({ name }: UserNicknameRequest): Promise<UserInfo> => {
    const response = await request.patch('/api/v1/user/name', {
      body: { name },
    });
    return response;
  },
};