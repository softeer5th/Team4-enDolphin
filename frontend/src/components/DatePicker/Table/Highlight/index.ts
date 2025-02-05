import type { PropsWithChildren } from 'react';

export * from './HighlightBox';
export * from './HighlightGap';

export type HighlightState = 'none' | 'startOfRange' | 'inRange' | 'endOfRange';

export interface HighlightProps extends PropsWithChildren {
  highlightState: HighlightState;
}

