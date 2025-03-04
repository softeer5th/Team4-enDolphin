import { z } from 'zod';

import { SharedEventDtoSchema } from './SharedEventDto';

const FinishedScheduleSchema = z.object({
  discussionId: z.number(),
  title: z.string(),
  meetingMethodOrLocation: z.union([z.string(), z.null()]),
  sharedEventDto: z.union([SharedEventDtoSchema, z.null()]),
  participantPictureUrls: z.array(z.string()),
});

export const FinishedSchedulesResponseSchema = z.object({
  currentPage: z.number(),
  currentYear: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  finishedDiscussions: z.array(FinishedScheduleSchema),
});

export type FinishedSchedulesResponse = z.infer<typeof FinishedSchedulesResponseSchema>;
export type FinishedSchedule = z.infer<typeof FinishedScheduleSchema>;
