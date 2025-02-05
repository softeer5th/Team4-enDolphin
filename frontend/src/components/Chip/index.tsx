import type { PropsWithChildren } from 'react';

import type { Typo } from '../Text';
import { Text } from '../Text';
import { chipStyle } from './index.css';

interface ChipProps extends PropsWithChildren {
  color: 'blue' | 'green' | 'red' | 'black';
  style?: 'borderless' | 'weak' | 'filled';
  radius?: 'round' | 'max';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * @description Chip 컴포넌트.
 *
 * @param color - Chip의 색상.
 * @param style - Chip의 스타일.
 * @param radius - Chip의 모서리 둥글기.
 * @param size - Chip의 크기.
 * @param children - Chip의 내용.
 */
export const Chip = ({ 
  color, 
  style = 'weak',
  radius = 'round',
  size = 'sm',
  children, 
}: ChipProps) => {
  const fontMap: Record<typeof size, Typo> = {
    sm: 'b3M',
    md: 't3',
    lg: 't2',
  };

  return (
    <div className={chipStyle({ color, style, radius, size })}>
      <Text typo={fontMap[size]}>{children}</Text>
    </div>
  );
};