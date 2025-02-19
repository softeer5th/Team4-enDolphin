import type { AttendType } from '../model';

export const sharedScheduleQuerykeys = {
  upcoming: ['upcoming'],
  ongoing: (page: number, size: number, type: AttendType) => ['ongoing', page, size, type],
  finished: (page: number, size: number, year: number) => ['finished', page, size, year],
};
