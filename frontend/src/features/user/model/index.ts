import { z } from 'zod';

export const UserDTO = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  picture: z.string().url(),
});

export const UserInfoSchema = z.object({
  name: z.string(),
  picture: z.string().url(),
});

export const UserNicknameRequest = z.object({
  name: z.string(),
});

export type UserDTO = z.infer<typeof UserDTO>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type UserNicknameRequest = z.infer<typeof UserNicknameRequest>;
