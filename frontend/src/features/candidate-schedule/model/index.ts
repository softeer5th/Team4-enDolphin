import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const ScheduleEventStatusSchema = z.union([
  z.literal('adjustable'),
  z.literal('fixed'),
  z.literal('outOfRange'),
]);

const ScheduleEvent = z.object({
  id: z.number(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  title: z.string(),
  status: ScheduleEventStatusSchema,
});

const ParticipantSchema = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  selected: z.boolean().optional(),
  requirementOfAdjustment: z.boolean(),
  events: z.array(ScheduleEvent),
});

export const CandidateDetailRequestSchema = z.object({
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
  selectedUserIdList: z.array(z.number()),
});

export const CandidateDetailResponseSchema = z.object({
  discussionId: z.number(),
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
  participants: z.array(ParticipantSchema), 
});

export type ScheduleEventStatus = z.infer<typeof ScheduleEventStatusSchema>;
export type ScheduleEvent = z.infer<typeof ScheduleEvent>;

export type Participant = z.infer<typeof ParticipantSchema>;

export type CandidateDetailRequest = z.infer<typeof CandidateDetailRequestSchema>;

export type CandidateDetailResponse = z.infer<typeof CandidateDetailResponseSchema>;
