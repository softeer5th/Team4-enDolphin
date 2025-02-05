export type Time = number | 'all' | 'empty';

export type WEEKDAY = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export const TIMES: readonly Time[] = Object.freeze(
  new Array(24).fill(0)
    .map((_, i) => i));

export const WEEK: readonly WEEKDAY[] 
  = Object.freeze(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);

export const WEEK_MAP: Record<string, string> = Object.freeze({
  1: '첫째주',
  2: '둘째주',
  3: '셋째주',
  4: '넷째주',
  5: '다섯째주',
});

export const MINUTES = Object.freeze(
  new Array(4).fill(0)
    .map((_, i) => ({
      startTime: i * 15,
      endTime: i * 15 + 15,
    })));