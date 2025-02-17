import { z } from 'zod';

import { DATE_BAR, TIME  } from '@/constants/regex';
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
  dateRangeStart: z.string().regex(DATE_BAR),
  dateRangeEnd: z.string().regex(DATE_BAR),
  timeRangeStart: z.string().regex(TIME),
  timeRangeEnd: z.string().regex(TIME),
  duration: z.number().int()
    .positive(),
  meetingMethod: z.union([MeetingMethodENUM, z.null()]),
  location: z.string().optional(),
  deadline: z.string().regex(DATE_BAR),
});

const DiscussionResponse = z.object({
  id: z.number(),
  title: z.string(),
  dateRangeStart: z.string().regex(DATE_BAR),
  dateRangeEnd: z.string().regex(DATE_BAR),
  timeRangeStart: z.string().regex(TIME),
  timeRangeEnd: z.string().regex(TIME),
  meetingMethod: z.union([MeetingMethodENUM, z.null()]),
  location: z.string().optional(),
  duration: z.number().int(),
  deadline: z.string().regex(DATE_BAR),
  timeLeft: z.number().int(),
});

const DiscussionParticipantResponse = z.object({
  host: UserDTO,
  data: z.array(UserDTO),
});

export type DiscussionRequest = z.infer<typeof DiscussionRequest>;
export type DiscussionResponse = z.infer<typeof DiscussionResponse>;
export type DiscussionParticipantResponse = z.infer<typeof DiscussionParticipantResponse>;

export type MeetingMethodENUM = z.infer<typeof MeetingMethodENUM>;
export type DiscussionDTO = z.infer<typeof DiscussionDTO>;