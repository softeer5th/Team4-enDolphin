import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { DiscussionRequest } from '../model';
import { discussionApi } from '.';
import { discussionKeys } from './keys';

export const useDiscussionMutation = () => {
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    
    mutationFn: ({ body }: { 
      body: DiscussionRequest;
      callback: () => void;
    }) => discussionApi.postDiscussion(body),

    onSuccess: (_, { callback }) => {
      callback?.();
      queryClient.invalidateQueries({
        queryKey: discussionKeys.all,
      });
    },
  });
  
  return { mutate };
};