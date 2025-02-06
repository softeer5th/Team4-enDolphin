import type { PropsWithChildren } from 'react';

import { containerStyle } from './index.css';

const RootContentWrapper = ({ children }: PropsWithChildren) => (
  <div className={containerStyle}>
    {children}
  </div>
);

export default RootContentWrapper;
