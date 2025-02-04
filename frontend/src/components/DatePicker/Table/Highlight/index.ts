import type { PropsWithChildren } from 'react';

export * from './HighlightCell';
export * from './HighlightGap';

export type HighlightState = 'none' | 'startOfRange' | 'InRange' | 'EndOfRange';

export interface HighlightProps extends PropsWithChildren {
  highlightState: HighlightState;
}

