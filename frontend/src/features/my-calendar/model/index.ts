import { z } from 'zod';

const PersonalEventDTO = z.object({
  id: z.number(),
  title: z.string(),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
  isAdjustable: z.boolean(),
  syncWithGoogleCalendar: z.boolean(),
  googleEventId: z.string(),
  calendarId: z.string(),
});

const PersonalEventResponse = PersonalEventDTO.omit({ syncWithGoogleCalendar: true });
const PersonalEventRequest = PersonalEventDTO.omit(
  { id: true, googleEventId: true, calendarId: true },
);

export type PersonalEventDTO = z.infer<typeof PersonalEventDTO>;
export type PersonalEventResponse = z.infer<typeof PersonalEventResponse>;
export type PersonalEventRequest = z.infer<typeof PersonalEventRequest>;

export type PopoverType = 'add' | 'edit';