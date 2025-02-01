import type { InputHTMLAttributes } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { InputContext } from './InputContext';
import { inputFieldContainerStyle, inputFieldStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  // TODO: multiInput 구현
  const { size, state } = useSafeContext(InputContext);
  
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