import type { InputHTMLAttributes } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { InputContext } from './InputContext';
import { containerStyle, inputFieldStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { isValid } = useSafeContext(InputContext);
  
  return (
    <div className={containerStyle({ isValid })}>
      <input
        className={inputFieldStyle}
        {...props}
      />
    </div>
  );
};

export default InputField;