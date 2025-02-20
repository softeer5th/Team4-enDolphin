import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { personalEventKeys } from '@/features/my-calendar/api/keys';

import type { DiscussionConfirmRequest, DiscussionRequest } from '../model';
import { candidateApi, discussionApi } from '.';
import { invitationApi } from './invitationApi';
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

export const useInvitationJoinMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({ body }: {
      body: { discussionId: number; password?: string };
    }) => invitationApi.postInviatationJoin(body.discussionId, body.password),
  });
  return { mutate };
};

export const useDiscussionConfirmMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationFn: ({ id, body }: { 
      id: string;
      body: DiscussionConfirmRequest;
    }) => candidateApi.postDiscussionConfirm({ id, body }),
    onSuccess: ({ discussionId }) => {
      queryClient.invalidateQueries({
        queryKey: personalEventKeys.all,
      });
      navigate({
        to: '/discussion/confirm/$id',
        params: { id: String(discussionId) },
      });
    },
  });
  
  return { mutate };
};