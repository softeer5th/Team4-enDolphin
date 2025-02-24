import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const OngoingScheduleSchema = z.object({
  discussionId: z.number(),
  title: z.string(),
  dateRangeStart: zCoerceToDate,
  dateRangeEnd: zCoerceToDate,
  timeRangeStart: z.string(),
  timeRangeEnd: z.string(),
  duration: z.number(),
  timeLeft: z.number(),
  participantPictureUrls: z.array(z.string()),
});

export const OngoingSchedulesResponseSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  ongoingDiscussions: z.array(OngoingScheduleSchema),
});

export type AttendType = 'HOST' | 'ATTENDEE' | 'ALL';

export type OngoingSchedulesResponse = z.infer<typeof OngoingSchedulesResponseSchema>;
export type OngoingSchedule = z.infer<typeof OngoingScheduleSchema>;
