import type { JSX } from 'react';

import type { ButtonProps } from '.';
import { ButtonIconContainerStyle } from './buttonIcon.css';

const ICON_WIDTH = 16;

interface ButtonIconProps {
  children: JSX.Element;
  size: ButtonProps['size'];
}

const ButtonIcon = ({ size, children }: ButtonIconProps) => (
  <div className={ButtonIconContainerStyle({ size })}>
    <children.type {...children.props} width={ICON_WIDTH} />
  </div>
);

export default ButtonIcon;