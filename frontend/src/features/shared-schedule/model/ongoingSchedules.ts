import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const OngoingDiscussionSchema = z.object({
  id: z.number(),
  title: z.string(),
  dateRangeStart: zCoerceToDate,
  dateRangeEnd: zCoerceToDate,
  timeLeft: z.number(),
  participantPictureUrls: z.array(z.string()),
});

export const OngoingSchedulesResponseSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  ongoingDiscussions: z.array(OngoingDiscussionSchema),
});

export type OngoingSchedulesResponse = z.infer<typeof OngoingSchedulesResponseSchema>;
export type OngoingDiscussion = z.infer<typeof OngoingDiscussionSchema>;
