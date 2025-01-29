import type { PropsWithChildren } from 'react';

import * as styles from './text.css';

interface TextProps extends PropsWithChildren {
  typo?: keyof typeof styles;
} 

export const Text = ({ children, typo = 't2' }: TextProps) => 
  <span className={styles[typo]}>{children}</span>;