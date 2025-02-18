import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

export const InviteResponseSchema = z.object({
  host: z.string(),
  title: z.string(),
  dateRangeStart: zCoerceToDate,
  dateRangeEnd: zCoerceToDate,
  timeRangeStart: zCoerceToDate,
  timeRangeEnd: zCoerceToDate,
  duration: z.number(),
  isFull: z.preprocess(
    (arg) => (typeof arg === 'string' ? arg === 'true' : Boolean(arg)),
    z.boolean(),
  ),
  requirePassword: z.preprocess(
    (arg) => (typeof arg === 'string' ? arg === 'true' : Boolean(arg)),
    z.boolean(),
  ),
});

export type InviteResponse = z.infer<typeof InviteResponseSchema>;
