import type { CSSProperties, PropsWithChildren } from 'react';

export interface DefaultProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}