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
  disabled?: boolean;
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
  disabled = false,
  ...props
}: AsProp<T> & ComponentPropsWithoutRef<T> & ButtonProps) => {
  const Component = as || 'button';

  return (
    <Component 
      className={clsx(containerStyle({ variant, style, radius, size, disabled }), className)}
      {...props}
      {...accessibilityProps(Component, disabled, onClick)}
    >
      {leftIcon && <ButtonIcon size={size}>{leftIcon}</ButtonIcon>}
      <ButtonText size={size}>{children}</ButtonText>
      {rightIcon && <ButtonIcon size={size}>{rightIcon}</ButtonIcon>}
    </Component>
  );
};

/**
 * 버튼인 경우에는 disable 속성 주입, 버튼이 아닌 경우엔 aria-disabled와 클릭 방지 처리
 * */ 
const accessibilityProps = (
  Component: ElementType, 
  disabled: boolean,
  onClick?: MouseEventHandler,
) => {
  const isIntrinsicButton = typeof Component === 'string' && Component === 'button';
  if (isIntrinsicButton) return { disabled };
  if (!onClick) return {};

  const guardedOnClick: MouseEventHandler = disabled
    ? (event) => event.preventDefault()
    : onClick;
    
  return {
    'aria-disabled': disabled,
    onClick: guardedOnClick,
  };
};

export default Button;
