import type { InputHTMLAttributes } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { vars } from '../../theme/index.css';
import { ChevronDown } from '../Icon';
import { InputContext } from './InputContext';
import { inputFieldContainerStyle, inputFieldStyle, selectIconStyle } from './inputField.css';

const InputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { isValid, type } = useSafeContext(InputContext);
  
  return (
    <div className={inputFieldContainerStyle({ isValid, type })} onClick={props.onClick}>
      <input
        className={inputFieldStyle}
        readOnly={type === 'select'}
        {...props}
      />
      { type === 'select' &&
        <button 
          aria-hidden='true' // 스크린 리더(저시각자 보조기기)에서 무시
          className={selectIconStyle}
          tabIndex={-1} // tab으로 버튼 선택 안 되게
          type='button'
        >
          <ChevronDown fill={vars.color.Ref.Netural[500]} width={20} />
        </button>
      }
    </div>
  );
};

export default InputField;