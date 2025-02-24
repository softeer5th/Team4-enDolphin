import { z } from 'zod';

export interface JWTRequest {
  code: string;
}

const JWTResponse = z.object({
  accessToken: z.string(),
  expiredAt: z.string().datetime(),
});

export type JWTResponse = z.infer<typeof JWTResponse>;