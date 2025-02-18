import type { DiscussionCalendarRequest, DiscussionRankRequest } from '../model';

export const discussionKeys = {
  all: ['discussions'],
  detail: (id: string) => [...discussionKeys.all, id],
};

export const calendarKeys = {
  all: ['calendars'],
  detail: (id: string, body: DiscussionCalendarRequest) => 
    [...calendarKeys.all, id, JSON.stringify(body)],
};

export const rankKeys = {
  all: ['ranks'],
  detail: (id: string, body: DiscussionRankRequest) => 
    [...rankKeys.all, id, JSON.stringify(body)],
};

export const participantKeys = {
  all: ['participants'],
  detail: (id: string) => [...participantKeys.all, id],
};
