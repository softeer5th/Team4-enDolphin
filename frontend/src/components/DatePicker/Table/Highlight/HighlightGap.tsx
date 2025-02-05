import type { PropsWithChildren } from 'react';

import { highlightGapStyle } from './index.css';

const HighlightGap = ({ children }: PropsWithChildren) => (
  <div className={highlightGapStyle}>
    {children}
  </div>
);

export default HighlightGap;