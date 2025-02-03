import type { InputHTMLAttributes } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { vars } from '../../theme/index.css';
import { ChevronDown } from '../Icon';
import { InputContext } from './InputContext';
import { containerStyle, inputFieldStyle, selectIconStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { isValid, type } = useSafeContext(InputContext);
  
  return (
    <div className={containerStyle({ isValid, type })}>
      <input
        className={inputFieldStyle}
        {...props}
      />
      { type === 'select' &&
        <button className={selectIconStyle}>
          <ChevronDown fill={vars.color.Ref.Netural[500]} width={20} />
        </button>
      }
    </div>
  );
};

export default InputField;