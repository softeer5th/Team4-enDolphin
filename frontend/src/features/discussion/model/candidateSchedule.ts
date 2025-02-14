import { z } from 'zod';

const CandidateScheduleGetRequest = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  selectedUserIdList: z.array(z.number()),
});

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
          status: 'fixed',
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
          status: 'fixed',
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
    {
      id: 5,
      name: 'Eva',
      picture: 'https://example.com/images/eva.jpg',
      events: [
        {
          id: 501,
          startDateTime: new Date('2025-03-01T06:00:00'),
          endDateTime: new Date('2025-03-01T07:00:00'),
          title: 'Morning Jog',
          status: 'notInRange',
        },
        {
          id: 502,
          startDateTime: new Date('2025-03-01T10:00:00'),
          endDateTime: new Date('2025-03-01T10:45:00'),
          title: 'Team Kickoff',
          status: 'fixed',
        },
        {
          id: 503,
          startDateTime: new Date('2025-03-01T11:00:00'),
          endDateTime: new Date('2025-03-01T12:00:00'),
          title: 'Project Update',
          status: 'adjustable',
        },
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
        {
          id: 601,
          startDateTime: new Date('2025-03-01T09:00:00'),
          endDateTime: new Date('2025-03-01T09:45:00'),
          title: 'Preparation',
          status: 'notInRange',
        },
        {
          id: 602,
          startDateTime: new Date('2025-03-01T10:15:00'),
          endDateTime: new Date('2025-03-01T11:15:00'),
          title: 'Daily Standup',
          status: 'adjustable',
        },
        {
          id: 603,
          startDateTime: new Date('2025-03-01T11:30:00'),
          endDateTime: new Date('2025-03-01T12:30:00'),
          title: 'Tech Sync',
          status: 'fixed',
        },
        {
          id: 604,
          startDateTime: new Date('2025-03-01T12:45:00'),
          endDateTime: new Date('2025-03-01T13:30:00'),
          title: 'Wrap-up Discussion',
          status: 'adjustable',
        },
      ],
    },
    {
      id: 7,
      name: 'Grace',
      picture: 'https://example.com/images/grace.jpg',
      selected: true,
      events: [
        {
          id: 701,
          startDateTime: new Date('2025-03-01T10:30:00'),
          endDateTime: new Date('2025-03-01T11:00:00'),
          title: 'Quick Sync',
          status: 'fixed',
        },
        {
          id: 702,
          startDateTime: new Date('2025-03-01T13:15:00'),
          endDateTime: new Date('2025-03-01T14:15:00'),
          title: 'Post-Meeting Chat',
          status: 'notInRange',
        },
        {
          id: 703,
          startDateTime: new Date('2025-03-01T09:50:00'),
          endDateTime: new Date('2025-03-01T13:10:00'),
          title: 'Extended Discussion',
          status: 'adjustable',
        },
        {
          id: 704,
          startDateTime: new Date('2025-03-01T08:00:00'),
          endDateTime: new Date('2025-03-01T09:00:00'),
          title: 'Morning Update',
          status: 'notInRange',
        },
      ],
    },
    {
      id: 8,
      name: 'Heidi',
      picture: 'https://example.com/images/heidi.jpg',
      events: [
        {
          id: 801,
          startDateTime: new Date('2025-03-01T07:30:00'),
          endDateTime: new Date('2025-03-01T08:30:00'),
          title: 'Pre-briefing',
          status: 'notInRange',
        },
        {
          id: 802,
          startDateTime: new Date('2025-03-01T10:00:00'),
          endDateTime: new Date('2025-03-01T11:00:00'),
          title: 'Status Update',
          status: 'fixed',
        },
        {
          id: 803,
          startDateTime: new Date('2025-03-01T11:15:00'),
          endDateTime: new Date('2025-03-01T12:15:00'),
          title: 'Collaboration Session',
          status: 'adjustable',
        },
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
        {
          id: 901,
          startDateTime: new Date('2025-03-01T09:45:00'),
          endDateTime: new Date('2025-03-01T10:30:00'),
          title: 'Initial Briefing',
          status: 'adjustable',
        },
        {
          id: 902,
          startDateTime: new Date('2025-03-01T10:45:00'),
          endDateTime: new Date('2025-03-01T11:45:00'),
          title: 'Deep Dive',
          status: 'fixed',
        },
        {
          id: 903,
          startDateTime: new Date('2025-03-01T12:30:00'),
          endDateTime: new Date('2025-03-01T13:15:00'),
          title: 'Closing Discussion',
          status: 'adjustable',
        },
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
        {
          id: 1001,
          startDateTime: new Date('2025-03-01T08:00:00'),
          endDateTime: new Date('2025-03-01T09:00:00'),
          title: 'Breakfast Meeting',
          status: 'notInRange',
        },
        {
          id: 1002,
          startDateTime: new Date('2025-03-01T10:15:00'),
          endDateTime: new Date('2025-03-01T11:15:00'),
          title: 'Product Update',
          status: 'adjustable',
        },
        {
          id: 1003,
          startDateTime: new Date('2025-03-01T11:30:00'),
          endDateTime: new Date('2025-03-01T12:30:00'),
          title: 'Sales Strategy',
          status: 'fixed',
        },
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
