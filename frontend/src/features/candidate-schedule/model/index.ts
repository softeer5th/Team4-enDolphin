import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

const ScheduleEventStatusSchema = z.union([
  z.literal('ADJUSTABLE'),
  z.literal('FIXED'),
  z.literal('OUT_OF_RANGE'),
]);

const ScheduleEvent = z.object({
  id: z.number(),
  startDateTime: zCoerceToDate,
  endDateTime: zCoerceToDate,
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

// 서버에서는 KST 기준으로 시간을 주는데, timezone 정보가 없음.. 따라서 new Date(서버에서준시간) 하면 UTC로 인식해버려서
// (실제 시간 - 9시간)이 되어버림. 일단 KST로 변환해주는 로직을 넣어서 해결하긴 했는데, 추후 근본적인 문제의 원인 해소가 필요할 듯 ..
export const CandidateDetailRequestSchema = z.object({
  startDateTime: z.string(),
  endDateTime: z.string(),
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
