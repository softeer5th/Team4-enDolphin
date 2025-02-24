import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import * as styles from './text.css';

export type Typo = keyof typeof styles;

interface TextProps extends PropsWithChildren {
  typo?: Typo;
  color?: string;
  className?: string;
} 

export const Text = ({ children, typo = 't2', color = 'current', className }: TextProps) => 
  <span className={clsx(styles[typo], className)} style={{ color }}>
    {children}
  </span>;