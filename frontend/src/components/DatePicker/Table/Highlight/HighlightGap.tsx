
import type { HighlightProps } from '.';
import { highlightGapStyle } from './index.css';

const HighlightGap = ({ highlightState, children }: HighlightProps) => (
  <div className={highlightGapStyle({ highlightState })}>
    {children}
  </div>
);

export default HighlightGap;