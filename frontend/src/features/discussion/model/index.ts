import { z } from 'zod';

import { UserDTO } from '@/features/user/model';

const MeetingMethodENUM = z.enum(['OFFLINE', 'ONLINE']);

const DiscussionDTO = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  usersForAdjust: z.array(UserDTO.pick({ id: true, name: true })),
});

const DiscussionRequest = z.object({
  title: z.string().min(1, '제목은 필수입니다')
    .max(15, '제목은 15자 이하로 입력해주세요'),
  dateRangeStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateRangeEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeRangeStart: z.string().regex(/^\d{2}:\d{2}$/),
  timeRangeEnd: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int()
    .positive(),
  meetingMethod: z.union([MeetingMethodENUM, z.null()]),
  location: z.string().optional(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const DiscussionResponse = z.object({
  events: z.array(DiscussionDTO),
});

const DiscussionParticipantResponse = z.object({
  host: UserDTO,
  data: z.array(UserDTO),
});

export type DiscussionRequest = z.infer<typeof DiscussionRequest>;
export type DiscussionResponse = z.infer<typeof DiscussionResponse>;
export type DiscussionParticipantResponse = z.infer<typeof DiscussionParticipantResponse>;
export type MeetingMethodENUM = z.infer<typeof MeetingMethodENUM>;