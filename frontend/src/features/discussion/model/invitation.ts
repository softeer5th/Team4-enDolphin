import { z } from 'zod';

import { zCoerceToBoolean, zCoerceToDate, zCoerceToTime } from '@/utils/zod';

export const InvitationResponseSchema = z.object({
  host: z.string(),
  title: z.string(),
  dateRangeStart: zCoerceToDate,
  dateRangeEnd: zCoerceToDate,
  timeRangeStart: zCoerceToTime,
  timeRangeEnd: zCoerceToTime,
  duration: z.number(),
  isFull: zCoerceToBoolean,
  requirePassword: zCoerceToBoolean,
});

export type InviteResponse = z.infer<typeof InvitationResponseSchema>;
