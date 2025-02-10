import { z } from 'zod';

const MeetingMethodDTO = z.enum(['OFFLINE', 'ONLINE']);

const DiscussionRequestDTO = z.object({
  title: z.string().min(1, '제목은 필수입니다')
    .max(15, '제목은 15자 이하로 입력해주세요'),
  dateRangeStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateRangeEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeRangeStart: z.string().regex(/^\d{2}:\d{2}$/),
  timeRangeEnd: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int()
    .positive(),
  meetingMethod: z.union([MeetingMethodDTO, z.null()]),
  location: z.string().optional(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type DiscussionRequestDTO = z.infer<typeof DiscussionRequestDTO>;
export type MeetingMethodDTO = z.infer<typeof MeetingMethodDTO>;