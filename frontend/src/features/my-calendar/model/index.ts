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

const PersonalEventResponse = z.array(PersonalEventDTO.omit({ syncWithGoogleCalendar: true }));

export type PersonalEventDTO = z.infer<typeof PersonalEventDTO>;
export type PersonalEventResponse = z.infer<typeof PersonalEventResponse>;

export type PopoverType = 'add' | 'edit';