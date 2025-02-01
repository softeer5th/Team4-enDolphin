
import type { PropsWithChildren } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { Text, type Typo } from '../Text';
import type { ButtonProps } from '.';
import { ButtonContext } from './ButtonContext';

const ButtonText = ({ children }: PropsWithChildren) => {
  const { size } = useSafeContext(ButtonContext);
  const fontMap: Record<ButtonProps['size'], Typo> = {
    sm: 'caption',
    md: 't2',
    lg: 't2',
    xl: 't2',
  };

  return <Text typo={fontMap[size]}>{children}</Text>;

};

export default ButtonText;