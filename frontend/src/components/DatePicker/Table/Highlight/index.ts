import type { PropsWithChildren } from 'react';

export * from './HighlightBox';
export * from './HighlightGap';

export type HighlightState = 'none' | 'startOfRange' | 'inRange' | 'endOfRange';

export interface HighlightRange {
  start: Date | null;
  end: Date | null;
}

export interface HighlightProps extends PropsWithChildren {
  highlightState: HighlightState;
}

