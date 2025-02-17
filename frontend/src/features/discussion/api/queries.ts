import { useQuery } from '@tanstack/react-query';

import type { 
  DiscussionCalendarRequest, 
  DiscussionCalendarResponse,
  DiscussionRankRequest,
  DiscussionRankResponse,
  DiscussionResponse, 
} from '../model';
import { candidateApi, discussionApi } from '.';
import { calendarKeys, discussionKeys, rankKeys } from './keys';

export const discussionQuery = (discussionId: string) => ({
  queryKey: discussionKeys.detail(discussionId), 
  queryFn: () => discussionApi.getDiscussion(discussionId),
});

export const discussionCalendarQuery = (
  discussionId: string, body: DiscussionCalendarRequest,
) => ({
  queryKey: calendarKeys.detail(discussionId, body),
  queryFn: () => candidateApi.postCalendarCandidate(discussionId, body),
});

export const discussionRankQuery = (
  discussionId: string, body: DiscussionRankRequest,
) => ({
  queryKey: rankKeys.detail(discussionId, body),
  queryFn: () => candidateApi.postRankCandidate(discussionId, body),
});

export const useDiscussionQuery = (discussionId: string) => {
  const { data: discussion, isLoading } 
    = useQuery<DiscussionResponse>(discussionQuery(discussionId));

  return { discussion, isLoading };
};

export const useDiscussionCalendarQuery = (
  discussionId: string, body: DiscussionCalendarRequest,
) => {  
  const { data: calendar, isLoading } = useQuery<DiscussionCalendarResponse['events']>(
    discussionCalendarQuery(discussionId, body),
  );

  return { calendar, isLoading };
};

export const useDiscussionRankQuery = (
  discussionId: string, body: DiscussionRankRequest,
) => {  
  const { data: rank, isLoading } = useQuery<DiscussionRankResponse>(
    discussionRankQuery(discussionId, body),
  );
  
  return { rank, isLoading };
};