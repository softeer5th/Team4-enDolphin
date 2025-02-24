import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { dropdownContentStyle } from './index.css';

interface DropdownContentsProps extends PropsWithChildren {
  height?: number | string;
  className?: string;
}

export const DropdownContents = ({ 
  children,
  className,
  height = 'auto',
}: DropdownContentsProps) => (
  <ul className={clsx(className, dropdownContentStyle)} style={{ height }}>
    {children}
  </ul>
);