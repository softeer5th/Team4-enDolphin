import type { InputHTMLAttributes } from 'react';

import { type CommonInputProps } from '.';
import HelperText from './HelperText';
import { containerStyle, inputFieldsContainerStyle } from './index.css';
import { InputContext } from './InputContext';
import InputField from './InputField';
import Label from './Label';

export interface SingleInputProps extends CommonInputProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
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
      <div className={inputFieldsContainerStyle}>
        <InputField 
          inputProps={inputProps} 
          onClick={onClick} 
          placeholder={placeholder} 
        />
      </div>
      {renderHelperText(isValid, hint, error)}
    </div>
  </InputContext.Provider>
);

const renderHelperText = (isValid: boolean, hint?: string, error?: string) => {
  if (!isValid) {
    return error && <HelperText type='error'>{error}</HelperText>;
  }
  return hint && <HelperText type='hint'>{hint}</HelperText>;
};

export default SingleInput;