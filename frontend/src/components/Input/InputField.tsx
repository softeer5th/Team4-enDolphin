import type { InputHTMLAttributes } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { InputContext } from './InputContext';
import { containerStyle, inputFieldStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { state } = useSafeContext(InputContext);
  
  return (
    <div className={containerStyle({ state })}>
      <input
        className={inputFieldStyle}
        {...props}
      />
    </div>
  );
};

export default InputField;