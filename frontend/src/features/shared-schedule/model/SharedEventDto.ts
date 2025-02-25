import { z } from 'zod';

import { zCoerceToDate } from '@/utils/zod';

export const SharedEventDtoSchema = z.object({
  id: z.number(),
  startDateTime: z.string(),
  endDateTime: z.string(),
});

export type SharedEventDto = z.infer<typeof SharedEventDtoSchema>;
