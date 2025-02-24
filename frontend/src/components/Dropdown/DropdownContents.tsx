import type { CSSProperties, PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { dropdownContentStyle } from './index.css';

interface DropdownContentsProps extends PropsWithChildren {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

export const DropdownContents = ({ 
  children,
  className,
  style,
  width = 'auto',
  height = 'auto',
}: DropdownContentsProps) => (
  <ul className={clsx(dropdownContentStyle, className)} style={{ width, height, ...style }}>
    {children}
  </ul>
);