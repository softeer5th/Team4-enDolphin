import type { PropsWithChildren } from 'react';

import { containerStyle } from './index.css';

const RootContainer = ({ children }: PropsWithChildren) => (
  <div className={containerStyle}>
    {children}
  </div>
);

export default RootContainer;