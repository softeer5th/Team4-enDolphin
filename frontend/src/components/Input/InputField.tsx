import type { HtmlHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import type { InputProps } from '.';
import { InputContext } from './InputContext';
import { inputFieldContainerStyle, inputFieldStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { size, state, multiInput } = useSafeContext(InputContext);
  // TODO: multiInput 구현
  
  return (
    <div className={inputFieldContainerStyle({ size, state })}>
      <input
        className={inputFieldStyle}
        {...props}
      />
    </div>
  );
};

export default InputField;