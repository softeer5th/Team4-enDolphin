import type { JSX, MouseEventHandler } from 'react';

import ButtonIcon from './ButtonIcon';
import ButtonText from './ButtonText';
import { containerStyle } from './index.css';

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'destructive' | 're';
  style?: 'weak' | 'filled' | 'outline' | 'borderless';
  radius?: 'max' | 'roundCorner';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: string;
}

const Button = ({
  type = 'primary',
  style = 'filled',
  radius = 'roundCorner',
  size = 'md',
  leftIcon,
  rightIcon,
  onClick,
  children,
}: ButtonProps) => (
  <button className={containerStyle({ type, style, radius, size })} onClick={onClick}>
    {leftIcon && <ButtonIcon size={size}>{leftIcon}</ButtonIcon>}
    <ButtonText size={size}>{children}</ButtonText>
    {rightIcon && <ButtonIcon size={size}>{rightIcon}</ButtonIcon>}
  </button>
);

export default Button;
