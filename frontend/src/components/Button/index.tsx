import type { 
  ComponentPropsWithoutRef, 
  ElementType, 
  JSX, 
  MouseEventHandler,
} from 'react';

import type { AsProp } from '@/types/polymorphism';
import clsx from '@/utils/clsx';

import ButtonIcon from './ButtonIcon';
import ButtonText from './ButtonText';
import { containerStyle } from './index.css';

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
  ...props
}: AsProp<T> & ComponentPropsWithoutRef<T> & ButtonProps) => {
  const Component = as || 'button';

  return(
    <Component 
      className={clsx(containerStyle({ variant, style, radius, size }), className)}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <ButtonIcon size={size}>{leftIcon}</ButtonIcon>}
      <ButtonText size={size}>{children}</ButtonText>
      {rightIcon && <ButtonIcon size={size}>{rightIcon}</ButtonIcon>}
    </Component>
  );
};

export default Button;
