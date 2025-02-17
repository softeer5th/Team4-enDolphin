import { z } from 'zod';

import { DATE_BAR, TIME } from '@/constants/regex';

export const zDate = z.string().regex(DATE_BAR)
  .transform((v) => new Date(v));

export const zTime = z.string().regex(TIME)
  .transform((v) => new Date(v));

const datelike = z.union([z.number(), z.string(), z.date()]);
export const zCoerceToDate = datelike.pipe(z.coerce.date());