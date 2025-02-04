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
  inputProps = {},
}: SingleInputProps) => (
  <InputContext.Provider value={{ isValid, type }}>
    <div className={containerStyle}>
      <Label required={required}>{label}</Label>
      <div className={inputFieldsContainerStyle}>
        <InputField {...inputProps} />
      </div>
      {isValid ? 
        <HelperText type='hint'>{hint}</HelperText>
        : 
        <HelperText type='error'>{error}</HelperText>
      }
    </div>
  </InputContext.Provider>
);

export default SingleInput;