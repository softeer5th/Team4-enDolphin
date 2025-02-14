import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { PersonalEventRequest } from '../model';
import { personalEventApi } from '.';
import { personalEventKeys } from './keys';

export const usePersonalEventMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (body: PersonalEventRequest) => personalEventApi.postPersonalEvent(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalEventKeys.all,
      });
    },
  });

  return { mutate };
};