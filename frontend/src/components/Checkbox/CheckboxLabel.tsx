import type { PropsWithChildren } from 'react';

import type { Typo } from '../Text';
import { Text } from '../Text';
import { labelStyle } from './index.css';
import type { Size } from './type';

interface CheckboxLabelProps extends PropsWithChildren {
  size: Size;
  style: 'rest' | 'selected';
}

export const CheckboxLabel = ({ size, style, children }: CheckboxLabelProps) => {
  const fontMap: Record<typeof size, Typo> = {
    sm: 'caption',
    md: 'b2M',
  };

  return(
    <span className={labelStyle({ size, style })}>
      <Text typo={fontMap[size]}>{children}</Text>
    </span>
  );
};