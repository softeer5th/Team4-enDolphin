import type { ReactNode } from 'react';

import { tabListStyle } from './index.css';

export const TabItemList = ({ children }: { children: ReactNode }) => (
  <ul className={tabListStyle}>
    {children}
  </ul>
);