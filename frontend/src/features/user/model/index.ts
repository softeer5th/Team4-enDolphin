import { z } from 'zod';

export const UserDTO = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  picture: z.string().url(),
});

export type UserDTO = z.infer<typeof UserDTO>;