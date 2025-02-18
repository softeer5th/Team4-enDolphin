import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { DiscussionRequest } from '../model';
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