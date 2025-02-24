import { z } from 'zod';

import { DATE_BAR, PASSWORD, TIME  } from '@/constants/regex';
import { UserDTO } from '@/features/user/model';

const MeetingMethodENUM = z.enum(['OFFLINE', 'ONLINE']);

const DiscussionDTO = z.object({
  startDateTime: z.string().regex(DATE_BAR),
  endDateTime: z.string().regex(DATE_BAR),
  usersForAdjust: z.array(UserDTO.pick({ id: true, name: true })),
});

const SharedEventDTO = z.object({
  id: z.number(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
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
  password: z.string().regex(PASSWORD)
    .optional(),
});

const DiscussionConfirmRequest = SharedEventDTO.omit({ id: true });

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
  participants: z.array(UserDTO),
});

const DiscussionCalendarRequest = z.object({
  startDate: z.string().regex(DATE_BAR)
    .optional(),
  endDate: z.string().regex(DATE_BAR)
    .optional(),
  selectedUserIdList: z.array(z.number()).optional(),
  size: z.number().int()
    .optional(),
});

const DiscussionRankRequest = z.object({
  selectedUserIdList: z.array(z.number()).nullable(),
});

const DiscussionCalendarResponse = z.object({
  events: z.array(DiscussionDTO),
});

const DiscussionRankResponse = z.object({
  eventsRankedDefault: z.array(DiscussionDTO),
  eventsRankedOfTime: z.array(DiscussionDTO),
});

const DiscussionConfirmResponse = z.object({
  discussionId: z.number(),
  title: z.string(),
  meetingMethodOrLocation: z.string(),
  sharedEventDto: SharedEventDTO,
  participantPictureUrls: z.array(z.string()),
});

export type DiscussionRequest = z.infer<typeof DiscussionRequest>;
export type DiscussionConfirmRequest = z.infer<typeof DiscussionConfirmRequest>;
export type DiscussionResponse = z.infer<typeof DiscussionResponse>;
export type DiscussionParticipantResponse = z.infer<typeof DiscussionParticipantResponse>;
export type DiscussionConfirmResponse = z.infer<typeof DiscussionConfirmResponse>;

export type DiscussionCalendarRequest = z.infer<typeof DiscussionCalendarRequest>;
export type DiscussionCalendarResponse = z.infer<typeof DiscussionCalendarResponse>;

export type DiscussionRankRequest = z.infer<typeof DiscussionRankRequest>;
export type DiscussionRankResponse = z.infer<typeof DiscussionRankResponse>;

export type MeetingMethodENUM = z.infer<typeof MeetingMethodENUM>;
export type DiscussionDTO = z.infer<typeof DiscussionDTO>;