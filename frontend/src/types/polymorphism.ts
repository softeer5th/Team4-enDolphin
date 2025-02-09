import type { ElementType } from 'react';

export type AsProp<T extends ElementType> = {
  as?: T;
};