import { z } from 'zod';

const CandidateScheduleGetRequest = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  selectedUserIdList: z.array(z.number()),
});

const ScheduleEventStatusSchema = z.union([
  z.literal('adjustable'),
  z.literal('fixed'),
  z.literal('notInRange'),
]);

const ScheduleEvent = z.object({
  id: z.number(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  title: z.string(),
  status: z.enum(['adjustable', 'fixed', 'notInRange']),
});

const Participant = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  selected: z.boolean().optional(),
  events: z.array(ScheduleEvent),
});

const CandidateScheduleGetResponse = z.object({
  discussionId: z.number(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  participants: z.array(Participant), 
});

export type ScheduleEvent = z.infer<typeof ScheduleEvent>;
export type ScheduleEventStatus = z.infer<typeof ScheduleEventStatusSchema>;

export type Participant = z.infer<typeof Participant>;

export type CandidateScheduleGetRequest = z.infer<typeof CandidateScheduleGetRequest>;

export type CandidateScheduleGetResponse = z.infer<typeof CandidateScheduleGetResponse>;

// ########## mocked data ###########
export const mockedCandidateScheduleGetResponse: CandidateScheduleGetResponse = {
  discussionId: 456,
  startDateTime: new Date('2025-03-01T10:00:00'),
  endDateTime: new Date('2025-03-01T13:00:00'),
  participants: [
    {
      id: 1,
      name: 'Alice',
      picture: 'https://example.com/images/alice.jpg',
      selected: true,
      events: [
        {
          id: 101,
          startDateTime: new Date('2025-03-01T08:00:00'),
          endDateTime: new Date('2025-03-01T09:00:00'),
          title: 'Morning Prep',
          status: 'notInRange',
        },
        {
          id: 102,
          startDateTime: new Date('2025-03-01T09:30:00'),
          endDateTime: new Date('2025-03-01T10:30:00'),
          title: 'Team Sync',
          status: 'adjustable',
        },
        {
          id: 103,
          startDateTime: new Date('2025-03-01T11:00:00'),
          endDateTime: new Date('2025-03-01T12:00:00'),
          title: 'Project Discussion',
          status: 'fixed',
        },
        {
          id: 104,
          startDateTime: new Date('2025-03-01T13:30:00'),
          endDateTime: new Date('2025-03-01T14:30:00'),
          title: 'Post-Meeting Wrap',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      picture: 'https://example.com/images/bob.jpg',
      events: [
        {
          id: 201,
          startDateTime: new Date('2025-03-01T07:00:00'),
          endDateTime: new Date('2025-03-01T08:00:00'),
          title: 'Early Bird',
          status: 'notInRange',
        },
        {
          id: 202,
          startDateTime: new Date('2025-03-01T10:00:00'),
          endDateTime: new Date('2025-03-01T11:00:00'),
          title: 'Client Call',
          status: 'adjustable',
        },
        {
          id: 203,
          startDateTime: new Date('2025-03-01T11:30:00'),
          endDateTime: new Date('2025-03-01T12:30:00'),
          title: 'Design Review',
          // fixed -> adjustable
          status: 'adjustable',
        },
        {
          id: 204,
          startDateTime: new Date('2025-03-01T14:00:00'),
          endDateTime: new Date('2025-03-01T15:00:00'),
          title: 'Wrap-up Session',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 3,
      name: 'Charlie',
      picture: 'https://example.com/images/charlie.jpg',
      events: [
        {
          id: 301,
          startDateTime: new Date('2025-03-01T09:45:00'),
          endDateTime: new Date('2025-03-01T10:15:00'),
          title: 'Quick Check',
          status: 'adjustable',
        },
        {
          id: 302,
          startDateTime: new Date('2025-03-01T10:30:00'),
          endDateTime: new Date('2025-03-01T11:30:00'),
          title: 'Strategy Talk',
          // fixed -> adjustable
          status: 'adjustable',
        },
        {
          id: 303,
          startDateTime: new Date('2025-03-01T12:30:00'),
          endDateTime: new Date('2025-03-01T13:00:00'),
          title: 'Final Discussion',
          status: 'adjustable',
        },
        {
          id: 304,
          startDateTime: new Date('2025-03-01T13:30:00'),
          endDateTime: new Date('2025-03-01T14:30:00'),
          title: 'Evening Chat',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 4,
      name: 'David',
      picture: 'https://example.com/images/david.jpg',
      selected: true,
      events: [
        {
          id: 401,
          startDateTime: new Date('2025-03-01T08:30:00'),
          endDateTime: new Date('2025-03-01T09:30:00'),
          title: 'Prep Meeting',
          status: 'notInRange',
        },
        {
          id: 402,
          startDateTime: new Date('2025-03-01T10:15:00'),
          endDateTime: new Date('2025-03-01T11:45:00'),
          title: 'Budget Discussion',
          status: 'fixed',
        },
        {
          id: 403,
          startDateTime: new Date('2025-03-01T12:00:00'),
          endDateTime: new Date('2025-03-01T13:30:00'),
          title: 'Team Review',
          status: 'adjustable',
        },
        {
          id: 404,
          startDateTime: new Date('2025-03-01T14:00:00'),
          endDateTime: new Date('2025-03-01T15:00:00'),
          title: 'Post Review',
          status: 'notInRange',
        },
      ],
    },
    // Eva부터 끝까지는 이벤트가 1~2개, 회의시간(10:00~13:00)과 겹치지 않고, 모두 notInRange로 변경
    {
      id: 5,
      name: 'Eva',
      picture: 'https://example.com/images/eva.jpg',
      events: [
        // 회의 전 이벤트
        {
          id: 501,
          startDateTime: new Date('2025-03-01T06:00:00'),
          endDateTime: new Date('2025-03-01T07:00:00'),
          title: 'Morning Jog',
          status: 'notInRange',
        },
        // 회의 후 이벤트
        {
          id: 504,
          startDateTime: new Date('2025-03-01T13:30:00'),
          endDateTime: new Date('2025-03-01T14:00:00'),
          title: 'Client Follow-up',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 6,
      name: 'Frank',
      picture: 'https://example.com/images/frank.jpg',
      events: [
        // 회의 전 이벤트만 선택 (1개)
        {
          id: 601,
          startDateTime: new Date('2025-03-01T09:00:00'),
          endDateTime: new Date('2025-03-01T09:45:00'),
          title: 'Preparation',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 7,
      name: 'Grace',
      picture: 'https://example.com/images/grace.jpg',
      selected: true,
      events: [
        // 회의 전 이벤트
        {
          id: 704,
          startDateTime: new Date('2025-03-01T08:00:00'),
          endDateTime: new Date('2025-03-01T09:00:00'),
          title: 'Morning Update',
          status: 'notInRange',
        },
        // 회의 후 이벤트
        {
          id: 702,
          startDateTime: new Date('2025-03-01T13:15:00'),
          endDateTime: new Date('2025-03-01T14:15:00'),
          title: 'Post-Meeting Chat',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 8,
      name: 'Heidi',
      picture: 'https://example.com/images/heidi.jpg',
      events: [
        // 회의 전 이벤트
        {
          id: 801,
          startDateTime: new Date('2025-03-01T07:30:00'),
          endDateTime: new Date('2025-03-01T08:30:00'),
          title: 'Pre-briefing',
          status: 'notInRange',
        },
        // 회의 후 이벤트
        {
          id: 804,
          startDateTime: new Date('2025-03-01T13:15:00'),
          endDateTime: new Date('2025-03-01T14:15:00'),
          title: 'Team Wrap-up',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 9,
      name: 'Ivan',
      picture: 'https://example.com/images/ivan.jpg',
      selected: true,
      events: [
        // 회의 후 이벤트만 선택 (1개)
        {
          id: 904,
          startDateTime: new Date('2025-03-01T14:00:00'),
          endDateTime: new Date('2025-03-01T15:00:00'),
          title: 'Evening Recap',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 10,
      name: 'Jasmine',
      picture: 'https://example.com/images/jasmine.jpg',
      events: [
        // 회의 전 이벤트
        {
          id: 1001,
          startDateTime: new Date('2025-03-01T08:00:00'),
          endDateTime: new Date('2025-03-01T09:00:00'),
          title: 'Breakfast Meeting',
          status: 'notInRange',
        },
        // 회의 후 이벤트
        {
          id: 1004,
          startDateTime: new Date('2025-03-01T13:30:00'),
          endDateTime: new Date('2025-03-01T14:30:00'),
          title: 'Client Discussion',
          status: 'notInRange',
        },
      ],
    },
  ],
};
