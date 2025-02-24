import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/utils/auth';

import type { UserNicknameRequest } from '../model';
import { userApi } from '.';
import { userInfoQueryKey } from './keys';

export const useNicknameMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ name }: UserNicknameRequest ) => userApi.patchNickname({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userInfoQueryKey(getAccessToken()),
      });
    },
  });

  return { mutate };
};