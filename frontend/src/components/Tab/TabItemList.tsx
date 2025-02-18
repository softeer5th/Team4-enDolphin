import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { tabListStyle } from './index.css';

interface TabItemListProps extends PropsWithChildren {
  className?: string;
}

export const TabItemList = ({ children, className }: TabItemListProps) => (
  <ul className={clsx(className, tabListStyle)}>
    {children}
  </ul>
);