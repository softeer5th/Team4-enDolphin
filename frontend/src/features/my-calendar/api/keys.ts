import type { DateRangeParams } from '../model';

export const personalEventKeys = {
  all: ['personalEvents'],
  detail: (data: DateRangeParams) => 
    [...personalEventKeys.all, data],
};