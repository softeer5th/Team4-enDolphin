import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { dropdownContentStyle } from './index.css';

interface DropdownContentsProps extends PropsWithChildren {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const DropdownContents = ({ 
  children,
  className,
  width = 'auto',
  height = 'auto',
}: DropdownContentsProps) => (
  <ul className={clsx(className, dropdownContentStyle)} style={{ width, height }}>
    {children}
  </ul>
);