import { z } from 'zod';

const CandidateScheduleGetRequest = z.object({
  startDateTime: z.date(),
  endDateTime: z.date(),
  selectedUserIdList: z.array(z.number()),
});

const CandidateScheduleGetResponse = z.object({
  discussionId: z.number(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  participants: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      picture: z.string(),
      selected: z.boolean().optional(),
      events: z.array(
        z.object({
          id: z.number(),
          startDateTime: z.date(),
          endDateTime: z.date(),
          title: z.string(),
          status: z.enum(['adjustable', 'fixed']),
        }),
      ),
    }),
  ),
});

export type CandidateScheduleGetRequest = z.infer<typeof CandidateScheduleGetRequest>;

export type CandidateScheduleGetResponse = z.infer<typeof CandidateScheduleGetResponse>;

// ########## mock data ###########
export const mockedCandidateScheduleGetResponse: CandidateScheduleGetResponse = {
  discussionId: 123,
  startDateTime: new Date('2024-02-15T09:00:00Z'),
  endDateTime: new Date('2024-02-15T11:00:00Z'),
  participants: [
    {
      id: 1,
      name: 'Alice',
      picture: 'https://example.com/alice.jpg',
      selected: true,
      events: [
        {
          id: 101,
          startDateTime: new Date('2024-02-15T09:30:00Z'),
          endDateTime: new Date('2024-02-15T10:30:00Z'),
          title: 'Team Meeting',
          status: 'adjustable',
        },
        {
          id: 102,
          startDateTime: new Date('2024-02-15T10:45:00Z'),
          endDateTime: new Date('2024-02-15T11:15:00Z'),
          title: 'Project Review',
          status: 'fixed',
        },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      picture: 'https://example.com/bob.jpg',
      selected: false,
      events: [
        {
          id: 103,
          startDateTime: new Date('2024-02-15T09:00:00Z'),
          endDateTime: new Date('2024-02-15T09:45:00Z'),
          title: 'Client Call',
          status: 'adjustable',
        },
      ],
    },
  ],
};

