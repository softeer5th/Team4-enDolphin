import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const SharedEventDtoSchema = z.object({
  id: z.number(),
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
});

const FinishedDiscussionSchema = z.object({
  id: z.number(),
  title: z.string(),
  meetingMethodOrLocation: z.string(),
  sharedEventDto: SharedEventDtoSchema,
  participantPictureUrls: z.array(z.string()),
});

export const FinishedSchedulesResponseSchema = z.object({
  currentYear: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  finisnedDiscussions: z.array(FinishedDiscussionSchema),
});

export type OngoingQueryType = 'HOST' | 'ATTENDEE' | 'ALL';
export type MeetingMethod = 'ONLINE' | 'OFFLINE';

export type FinishedSchedulesResponse = z.infer<typeof FinishedSchedulesResponseSchema>;
export type FinisnedDiscussion = z.infer<typeof FinishedDiscussionSchema>;
export type SharedEventDto = z.infer<typeof SharedEventDtoSchema>;
