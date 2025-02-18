import { useMutation, useQueryClient } from '@tanstack/react-query';

import { personalEventKeys } from '@/features/my-calendar/api/keys';

import type { DiscussionConfirmRequest, DiscussionRequest } from '../model';
import { discussionApi } from '.';
import { discussionKeys } from './keys';

export const useDiscussionMutation = () => {
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: ({ body }: { 
      body: DiscussionRequest;
      callback: (id: string) => void;
    }) => discussionApi.postDiscussion(body),
    onSuccess: ({ id }, { callback }) => {
      callback?.(id.toString());
      queryClient.invalidateQueries({
        queryKey: discussionKeys.all,
      });
    },
  });
  
  return { mutate };
};

export const useDiscussionConfirmMutation = () => {
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: ({ id, body }: { 
      id: string;
      body: DiscussionConfirmRequest;
    }) => discussionApi.postDiscussionConfirm({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalEventKeys.all,
      });
    },
  });
  
  return { mutate };
};