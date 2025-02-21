import type { AttendType } from '../model';

export const upcomingQueryKey = ['upcoming'];

export const ongoingQueryKey = {
  all: ['ongoing'],
  detail: (page: number, size: number, type: AttendType) => 
    [...ongoingQueryKey.all, page, size, type],
};

export const finishedQueryKey = {
  all: ['finished'],
  detail: (page: number, size: number, year: number) => 
    [...finishedQueryKey.all, page, size, year],
}; 
