import type { MouseEventHandler, PropsWithChildren } from 'react';

import { ButtonContext } from './ButtonContext';
import ButtonIcon from './ButtonIcon';
import ButtonText from './ButtonText';
import { ContainerStyle } from './index.css';

export interface ButtonProps extends PropsWithChildren {
  type: 'primary' | 'secondary' | 'destructive' | 're';
  style: 'weak' | 'filled' | 'outline' | 'borderless';
  radius: 'max' | 'roundCorner';
  size: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type, style, radius, size, onClick, children }: ButtonProps) => (
  <ButtonContext.Provider value={{ size }}>
    <button className={ContainerStyle({ type, style, radius, size })} onClick={onClick}>
      {children}
    </button>
  </ButtonContext.Provider>
);

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export default Button;