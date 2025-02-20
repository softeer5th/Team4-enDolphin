import { useQuery } from '@tanstack/react-query';

import type { 
  DiscussionCalendarRequest, 
  DiscussionCalendarResponse,
  DiscussionConfirmResponse,
  DiscussionParticipantResponse,
  DiscussionRankRequest,
  DiscussionRankResponse,
  DiscussionResponse, 
} from '../model';
import { candidateApi, discussionApi } from '.';
import { 
  candidateKeys, 
  discussionKeys,
  hostKeys, 
  participantKeys,
  sharedEventKeys, 
} from './keys';

export const discussionQuery = (discussionId: string) => ({
  queryKey: discussionKeys.detail(discussionId), 
  queryFn: () => discussionApi.getDiscussion(discussionId),
});

export const discussionCalendarQuery = (
  discussionId: string, body: DiscussionCalendarRequest,
) => ({
  queryKey: candidateKeys.calendar(discussionId, body),
  queryFn: () => candidateApi.postCalendarCandidate(discussionId, body),
  gcTime: 0,
});

export const discussionRankQuery = (
  discussionId: string, body: DiscussionRankRequest,
) => ({
  queryKey: candidateKeys.rank(discussionId, body),
  queryFn: () => candidateApi.postRankCandidate(discussionId, body),
  gcTime: 0,
});

export const discussionParticipantQuery = (discussionId: string) => ({
  queryKey: participantKeys.detail(discussionId),
  queryFn: () => candidateApi.getCandidateParticipants(discussionId),
  gcTime: 0,
});

export const discussionConfirmQuery = (discussionId: string) => ({
  queryKey: sharedEventKeys.detail(discussionId),
  queryFn: () => candidateApi.getDiscussionConfirm(discussionId),
});

export const discussionHostQuery = (discussionId: string) => ({
  queryKey: hostKeys.detail(discussionId),
  queryFn: () => discussionApi.getIsHost(discussionId),
});

export const useDiscussionQuery = (discussionId: string) => {
  const { data: discussion, isLoading } 
    = useQuery<DiscussionResponse>(discussionQuery(discussionId));

  return { discussion, isLoading };
};

export const useDiscussionCalendarQuery = (
  discussionId: string, body: DiscussionCalendarRequest,
) => {  
  const { data: calendar, refetch, isPending } = useQuery<DiscussionCalendarResponse['events']>(
    discussionCalendarQuery(discussionId, body),
  );

  return { calendar, isPending, refetch };
};

export const useDiscussionRankQuery = (
  discussionId: string, body: DiscussionRankRequest,
) => {  
  const { data: rank, isLoading } = useQuery<DiscussionRankResponse>(
    discussionRankQuery(discussionId, body),
  );
  
  return { rank, isLoading };
};

export const useDiscussionParticipantsQuery = (discussionId: string) => {
  const { data: participants, isPending } 
        = useQuery<DiscussionParticipantResponse['participants']>(
          discussionParticipantQuery(discussionId),
        );
    
  return { participants, isPending };
};

export const useDiscussionConfirmQuery = (discussionId: string) => {
  const { data: sharedEvent, isPending } 
    = useQuery<DiscussionConfirmResponse>(discussionConfirmQuery(discussionId));

  return { sharedEvent, isPending };
};

export const useDiscussionHostQuery = (discussionId: string) => {
  const { data: isHost, isPending }
    = useQuery<boolean>(discussionHostQuery(discussionId));

  return { isHost, isPending };
};
