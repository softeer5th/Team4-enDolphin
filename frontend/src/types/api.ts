import { z } from 'zod';

export const LocalTime = z.object({
  hour: z.number(),
  minute: z.number(),
  second: z.number(),
  nano: z.number(),
});

export type LocalTime = z.infer<typeof LocalTime>;