import type { PersonalEventDTO } from '../model';

export const personalEventKeys = {
  all: ['personalEvents'],
  detail: (data: Pick<PersonalEventDTO, 'startDateTime' | 'endDateTime'>) => 
    [...personalEventKeys.all, data],
};