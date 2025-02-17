import { useQuery } from '@tanstack/react-query';

import type { 
  DiscussionCalendarRequest, 
  DiscussionCalendarResponse,
  DiscussionResponse, 
} from '../model';
import { candidateApi, discussionApi } from '.';
import { calendarKeys, discussionKeys } from './keys';

export const discussionQuery = (discussionId: string) => ({
  queryKey: discussionKeys.detail(discussionId), 
  queryFn: () => discussionApi.getDiscussion(discussionId),
});

export const discussionCalendarQuery = (
  discussionId: string, body: DiscussionCalendarRequest,
) => ({
  // body가 쿼리키로 사용되는 것은 좋지 않습니다.
  // eslint-disable-next-line
  queryKey: calendarKeys.detail(discussionId),
  queryFn: () => candidateApi.postCalendarCandidate(discussionId, body),
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