import type { PropsWithChildren } from 'react';

import type { Typo } from '../Text';
import { Text } from '../Text';
import { chipStyle } from './index.css';

interface ChipProps extends PropsWithChildren {
  color: 'blue' | 'green' | 'red' | 'black';
  style: 'borderness' | 'weak' | 'filled';
  radius: 'round' | 'max';
  size: 'sm' | 'md' | 'lg';
}

export const Chip = ({ color, style, radius, size, children }: ChipProps) => {
  const fontMap: Record<typeof size, Typo> = {
    sm: 'b3M',
    md: 't3',
    lg: 't2',
  };

  return (
    <div
      className={chipStyle({
        color,
        style,
        radius,
        size,
      })}
    >
      <Text typo={fontMap[size]}>{children}</Text>
    </div>
  );
};