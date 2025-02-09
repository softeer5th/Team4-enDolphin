import type { PropsWithChildren } from 'react';

import { rowContainerStyle } from './index.css';

const RowContainer = ({ children }: PropsWithChildren) => (
  <div className={rowContainerStyle}>
    {children}
  </div>
);

export default RowContainer;