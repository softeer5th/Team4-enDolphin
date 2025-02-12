import { z } from 'zod';

export type PopoverType = 'add' | 'edit';

const PersonalEventRequest = z.object({
  title: z.string(),
  startDateTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
  endDateTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
  isAdjustable: z.boolean(),
  syncWithGoogleCalendar: z.boolean(),
});

export type PersonalEventRequest = z.infer<typeof PersonalEventRequest>;

