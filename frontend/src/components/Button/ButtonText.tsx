
import type { PropsWithChildren } from 'react';

import { Text, type Typo } from '../Text';
import type { ButtonProps } from '.';

interface ButtonTextProps extends PropsWithChildren {
  size: ButtonProps['size'];
}

const ButtonText = ({ size, children }: ButtonTextProps) => {
  const fontMap: Record<ButtonProps['size'], Typo> = {
    sm: 'caption',
    md: 't2',
    lg: 't2',
    xl: 't2',
  };

  return <Text typo={fontMap[size]}>{children}</Text>;

};

export default ButtonText;