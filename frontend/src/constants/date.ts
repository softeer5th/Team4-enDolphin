export type Time = number | 'all' | 'empty';

export const TIMES: readonly Time[] = Object.freeze(
  new Array(24).fill(0)
    .map((_, i) => i));