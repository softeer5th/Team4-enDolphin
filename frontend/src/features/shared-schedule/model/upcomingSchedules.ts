import { z } from 'zod';

const Schedule = z.object({
  id: z.number(),
  title: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  meetingMethodOrLocation: z.enum(['ONLINE', 'OFFLINE']),
  participantPictureUrls: z.array(z.string()),
});

export const UpcomingSchedulesResponseSchema = z.object({
  data: z.array(Schedule),
});

export type Schedule = z.infer<typeof Schedule>;
export type UpcomingSchedulesResponse = z.infer<typeof UpcomingSchedulesResponseSchema>;
