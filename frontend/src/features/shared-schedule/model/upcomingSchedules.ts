import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const Schedule = z.object({
  id: z.number(),
  title: z.string(),
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
  meetingMethodOrLocation: z.enum(['ONLINE', 'OFFLINE']),
  participantPictureUrls: z.array(z.string()),
});

export const UpcomingSchedulesResponseSchema = z.object({
  data: z.array(Schedule),
});

export type Schedule = z.infer<typeof Schedule>;
export type UpcomingSchedulesResponse = z.infer<typeof UpcomingSchedulesResponseSchema>;
