import { z } from 'zod';

import { zCoerceToDate, zCoerceToTime } from '@/utils/zod';

export const InvitationResponseSchema = z.object({
  host: z.string(),
  title: z.string(),
  dateRangeStart: zCoerceToDate,
  dateRangeEnd: zCoerceToDate,
  timeRangeStart: zCoerceToTime,
  timeRangeEnd: zCoerceToTime,
  duration: z.number(),
  isFull: z.boolean(),
  requirePassword: z.boolean(),
});

export const InvitationJoinRequestSchema = z.object({
  password: z.string().regex(/^\d{4,6}$/, 'Password must be a 4 to 6 digit number'),
});

export const InvitationJoinResponseSchema = z.object({
  isSuccess: z.boolean(),
  failedCount: z.number(),
});

export const InvitationJoinRequestSchema = z.object({
  password: z.string().regex(/^\d{4,6}$/, 'Password must be a 4 to 6 digit number'),
});

export const InvitationJoinResponseSchema = z.object({
  isSuccess: z.boolean(),
  failedCount: z.number(),
});

export type InviteResponse = z.infer<typeof InvitationResponseSchema>;
export type InviteJoinRequest = z.infer<typeof InvitationJoinRequestSchema>;
export type InviteJoinResponse = z.infer<typeof InvitationJoinResponseSchema>;
