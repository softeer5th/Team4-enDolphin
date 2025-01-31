import type { PropsWithChildren } from 'react';

import * as styles from './text.css';

export type Typo = keyof typeof styles;

interface TextProps extends PropsWithChildren {
  typo?: Typo;
  color?: string;
} 

export const Text = ({ children, typo = 't2', color = 'current' }: TextProps) => 
  <span className={styles[typo]} style={{ color }}>{children}</span>;