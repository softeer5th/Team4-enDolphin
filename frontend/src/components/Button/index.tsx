import type { JSX, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

import { ButtonContext } from './ButtonContext';
import ButtonIcon from './ButtonIcon';
import ButtonText from './ButtonText';
import { containerStyle } from './index.css';

export interface ButtonProps extends PropsWithChildren {
  type: 'primary' | 'secondary' | 'destructive' | 're';
  style: 'weak' | 'filled' | 'outline' | 'borderless';
  radius: 'max' | 'roundCorner';
  size: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
  <ButtonContext.Provider value={{ size }}>
    <button className={containerStyle({ type, style, radius, size })} onClick={onClick}>
      {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
      <ButtonText>{children}</ButtonText>
      {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
    </button>
  </ButtonContext.Provider>
);

export default Button;
