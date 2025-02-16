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

export const usePersonalEventUpdateMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (
      { id, body }: { id: number; body: PersonalEventRequest },
    ) => personalEventApi.putPersonalEvent(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalEventKeys.all,
      });
    },
  });

  return { mutate };
};

export const usePersonalEventDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => personalEventApi.deletePersonalEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalEventKeys.all,
      });
    },
  });

  return { mutate };
};