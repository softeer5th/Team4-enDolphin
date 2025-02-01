import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import type { Typo } from '../Text';
import HelperText from './HelperText';
import { containerStyle } from './index.css';
import { InputContext } from './InputContext';
import InputField from './InputField';
import Label from './Label';

export interface InputProps extends PropsWithChildren {
  state: 'neutral' | 'error';
  multiInput: boolean;
  size: 'md';
}

export const Input = ({ state, multiInput, size, children }: InputProps) => 
// const fontMap: Record<typeof size, Typo> = {
//   md: 'b3R',
// };
  (
    <InputContext.Provider value={{ size, state, multiInput }}>
      <div className={containerStyle}>
        {children}
      </div>
    </InputContext.Provider>
  );

Input.Label = Label;
Input.InputField = InputField;
Input.HelperText = HelperText;

export default Input;