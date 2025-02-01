import type { PropsWithChildren } from 'react';

import type { Typo } from '../Text';
import { Text } from '../Text';
import { ContainerStyle } from './index.css';

interface ButtonProps extends PropsWithChildren {
  type: 'primary' | 'secondary' | 'destructive' | 're';
  style: 'weak' | 'filled' | 'outline' | 'borderless';
  radius: 'max' | 'roundCorner';
  size: 'sm' | 'md' | 'lg' | 'xl';
}

const Button = ({ type, style, radius, size, children }: ButtonProps) => {
  const fontMap: Record<ButtonProps['size'], Typo> = {
    sm: 'caption',
    md: 't2',
    lg: 't2',
    xl: 't2',
  };
  
  return (<button className={ContainerStyle({ type, style, radius, size })}>
    <Text typo={fontMap[size]}>{children}</Text>
  </button>);
};

export default Button;