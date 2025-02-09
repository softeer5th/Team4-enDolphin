import type { InputHTMLAttributes } from 'react';

import { type CommonInputProps } from '.';
import HelperText from './Core/HelperText';
import InputField from './Core/InputField';
import Label from './Core/Label';
import { containerStyle, inputFieldsContainerStyle, interactableBorderStyle } from './index.css';
import { InputContext } from './InputContext';

export interface SingleInputProps extends CommonInputProps {
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'onClick' | 'readOnly'>;
}

export const SingleInput = ({ 
  label,
  type = 'text',
  isValid = true,
  required = false, 
  hint, 
  error,
  placeholder,
  onClick,
  inputProps = {},
}: SingleInputProps) => (
  <InputContext.Provider value={{ isValid, type }}>
    <div className={containerStyle}>
      <Label required={required}>{label}</Label>
      <div className={`${inputFieldsContainerStyle} ${interactableBorderStyle({ isValid })}`}>
        <InputField 
          {...inputProps}
          onClick={onClick} 
          placeholder={placeholder} 
        />
      </div>
      <HelperText
        error={error}
        hint={hint}
        isValid={isValid}
      />
    </div>
  </InputContext.Provider>
);
export default SingleInput;