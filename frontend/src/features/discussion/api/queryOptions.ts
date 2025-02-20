import type { DiscussionCalendarRequest } from '../model';
import { candidateApi } from '.';
import { invitationApi } from './invitationApi';
import { candidateKeys, invitationQueryKey } from './keys';

export const invitationQueryOption = (discussionId: number) => ({
  queryKey: invitationQueryKey(discussionId),
  queryFn: () => invitationApi.getInvitationInfo(discussionId),
});

export const discussionCalenderQueryOptions = (
  discussionId: string, body: DiscussionCalendarRequest, gcTime: number = 0,
) => ({
  queryKey: candidateKeys.calendar(discussionId, body),
  queryFn: () => candidateApi.postCalendarCandidate(discussionId, body),
  gcTime: gcTime,
});