import { z } from 'zod';

import { SharedEventDtoSchema } from './SharedEventDto';

export const UpcomingScheduleSchema = z.object({
  discussionId: z.number(),
  title: z.string(),
  meetingMethodOrLocation: z.union([z.string(), z.null()]),
  sharedEventDto: SharedEventDtoSchema,
  participantPictureUrls: z.array(z.string()),
});

export const UpcomingSchedulesResponseSchema = z.object({
  data: z.array(UpcomingScheduleSchema),
});

export type UpcomingSchedule = z.infer<typeof UpcomingScheduleSchema>;
export type UpcomingSchedulesResponse = z.infer<typeof UpcomingSchedulesResponseSchema>;
