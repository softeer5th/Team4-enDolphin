import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const UpcomingScheduleSchema = z.object({
  id: z.number(),
  title: z.string(),
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
  meetingMethodOrLocation: z.enum(['ONLINE', 'OFFLINE']),
  participantPictureUrls: z.array(z.string()),
});

export const UpcomingSchedulesResponseSchema = z.object({
  data: z.array(UpcomingScheduleSchema),
});

export type UpcomingSchedule = z.infer<typeof UpcomingScheduleSchema>;
export type UpcomingSchedulesResponse = z.infer<typeof UpcomingSchedulesResponseSchema>;
