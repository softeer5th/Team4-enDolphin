import { z } from 'zod';

import { DATE_YYYY_MM_DD_REGEX, TIME_HH_MM_REGEX } from '@/constants/regex';

export const zValidateDateWithTransform = z.string().regex(DATE_YYYY_MM_DD_REGEX)
  .transform((v) => new Date(v));

export const zValidateTimeWithTransform = z.string().regex(TIME_HH_MM_REGEX)
  .transform((v) => new Date(v));
