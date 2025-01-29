import type { PropsWithChildren } from 'react';

import * as styles from './text.css';

export type Typo = keyof typeof styles;

interface TextProps extends PropsWithChildren {
  typo?: Typo;
} 

export const Text = ({ children, typo = 't2' }: TextProps) => 
  <span className={styles[typo]}>{children}</span>;