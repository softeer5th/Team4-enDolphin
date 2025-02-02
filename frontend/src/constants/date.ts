export type Time = number | 'all' | 'empty';

export const TIMES: readonly Time[] = Object.freeze(
  new Array(24).fill(0)
    .map((_, i) => i));

export const WEEK = Object.freeze(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);