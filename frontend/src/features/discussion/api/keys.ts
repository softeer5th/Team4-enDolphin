import type { DiscussionCalendarRequest, DiscussionRankRequest } from '../model';

export const discussionKeys = {
  all: ['discussions'],
  detail: (id: string) => [...discussionKeys.all, id],
};

export const candidateKeys = {
  all: ['candidates'],
  detail: (id: string) => [...candidateKeys.all, id],
  calendar: (
    id: string, {
      startDate,
      endDate,
      selectedUserIdList,
    }: DiscussionCalendarRequest) => 
    [...candidateKeys.detail(id), 'calendar', startDate, endDate, selectedUserIdList?.join(',')],
  rank: (id: string, { selectedUserIdList }: DiscussionRankRequest) => 
    [...candidateKeys.detail(id), 'rank', selectedUserIdList?.join(',')],
};

export const participantKeys = {
  all: ['participants'],
  detail: (id: string) => [...participantKeys.all, id],
};

export const invitationQueryKey = (discussionId: number) => ['invitation', discussionId];

export const sharedEventKeys = {
  all: ['sharedEvents'],
  detail: (id: string) => [...sharedEventKeys.all, id],
};

export const hostKeys = {
  all: ['hosts'],
  detail: (id: string) => [...hostKeys.all, id],
};
