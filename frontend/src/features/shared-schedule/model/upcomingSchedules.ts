import { z } from 'zod';

const SharedEventDtoSchema = z.object({
  id: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(),
});

export const UpcomingScheduleSchema = z.object({
  discussionId: z.number(),
  title: z.string(),
  meetingMethodOrLocation: z.string(),
  sharedEventDto: SharedEventDtoSchema,
  participantPictureUrls: z.array(z.string()),
});

export const UpcomingSchedulesResponseSchema = z.object({
  data: z.array(UpcomingScheduleSchema),
});

export type UpcomingSchedule = z.infer<typeof UpcomingScheduleSchema>;
export type UpcomingSchedulesResponse = z.infer<typeof UpcomingSchedulesResponseSchema>;
