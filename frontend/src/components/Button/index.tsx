import type { 
  ComponentPropsWithoutRef, 
  ElementType, 
  JSX, 
  MouseEventHandler,
} from 'react';

import clsx from '@/utils/clsx';

import ButtonIcon from './ButtonIcon';
import ButtonText from './ButtonText';
import { containerStyle } from './index.css';

type AsProp<T extends ElementType = 'button'> = {
  as?: T;
};

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 're';
  style?: 'weak' | 'filled' | 'outline' | 'borderless';
  radius?: 'max' | 'roundCorner';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: string;
  className?: string;
}

const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  style = 'filled',
  radius = 'roundCorner',
  size = 'md',
  leftIcon,
  rightIcon,
  onClick,
  children,
  className,
}: AsProp<T> & ComponentPropsWithoutRef<T> & ButtonProps) => {
  const Component = as || 'button';

  return(
    <Component 
      className={clsx(containerStyle({ variant, style, radius, size }), className)}
      onClick={onClick}
    >
      {leftIcon && <ButtonIcon size={size}>{leftIcon}</ButtonIcon>}
      <ButtonText size={size}>{children}</ButtonText>
      {rightIcon && <ButtonIcon size={size}>{rightIcon}</ButtonIcon>}
    </Component>
  );
};

export default Button;
