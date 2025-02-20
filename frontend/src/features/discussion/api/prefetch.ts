import type { QueryClient } from '@tanstack/react-query';

import type { DiscussionCalendarRequest } from '../model';
import { discussionCalenderQueryOptions } from './queryOptions';

export const prefetchDiscussionCalendar = (
  queryClient: QueryClient,
  body: DiscussionCalendarRequest,
  discussionId: string,
  gcTime: number,
) => {
  queryClient.prefetchQuery(
    discussionCalenderQueryOptions(discussionId, body, gcTime),
  );
};
