import type { PropsWithChildren } from 'react';

import type { Typo } from '../Text';
import { Text } from '../Text';
import { labelStyle } from './index.css';
import type { Size } from './type';

interface CheckboxLabelProps extends PropsWithChildren {
  size: Size;
  id: string;
  style: 'rest' | 'selected';
}

export const CheckboxLabel = ({ size, id, style, children }: CheckboxLabelProps) => {
  const fontMap: Record<typeof size, Typo> = {
    sm: 'caption',
    md: 'b2M',
  };

  return(
    <label
      className={labelStyle({ size, style })}
      htmlFor={id}
    >
      <Text typo={fontMap[size]}>{children}</Text>
    </label>
  );
};