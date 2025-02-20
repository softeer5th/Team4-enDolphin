import { useQuery } from '@tanstack/react-query';

import { getAccessToken } from '@/utils/auth';

import { userApi } from '.';
import { userInfoQueryKey } from './keys';

export const useUserInfoQuery = () => useQuery({
  queryKey: userInfoQueryKey(getAccessToken()),
  queryFn: () => userApi.getUserInfo(),
});
