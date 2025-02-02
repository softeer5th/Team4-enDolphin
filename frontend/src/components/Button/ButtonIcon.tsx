import type { JSX } from 'react';

import type { ButtonProps } from '.';
import { ButtonIconContainerStyle } from './buttonIcon.css';

interface ButtonIconProps {
  children: JSX.Element;
  size: ButtonProps['size'];
}
const ButtonIcon = ({ size, children }: ButtonIconProps) => {
  const widthMap = {
    sm: 16,
    md: 16,
    lg: 16,
    xl: 16,
  };
  return (
    <div className={ButtonIconContainerStyle({ size })}>
      <children.type {...children.props} width={widthMap[size ?? 'md']}/>
    </div>
  );
};

export default ButtonIcon;