import type { InputHTMLAttributes, PropsWithChildren } from 'react';
import type { Typo } from '../Text';
import { Text } from '../Text';

import { containerStyle } from './index.css';

interface InputProps extends PropsWithChildren {
  type: 'text' | 'select';
  state: 'placeholder' | 'focus' | 'typing' | 'filled' | 'error';
  multiInput: boolean;
  size: 'md';
  required: boolean;
}

export const Input = ({ type, state, multiInput, size, children }: InputProps) => {
  const fontMap: Record<typeof size, Typo> = {
    md: 't3',
  }
  return (
    <div className={containerStyle({
      
    })}>

    </div>
  )
};