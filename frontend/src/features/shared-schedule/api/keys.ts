import type { OngoingQueryType } from '../model/finishedSchedules';

export const sharedScheduleQuerykeys = {
  upcoming: ['upcoming'],
  ongoing: (page: number, size: number, type: OngoingQueryType) => ['ongoing', page, size, type],
  finished: (page: number, size: number, year: number) => ['finished', page, size, year],
};
