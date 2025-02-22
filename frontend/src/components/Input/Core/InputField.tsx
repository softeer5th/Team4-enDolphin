import type { InputHTMLAttributes } from 'react';
import { useRef } from 'react';

import { ChevronDown } from '@/components/Icon';
import { useSafeContext } from '@/hooks/useSafeContext';
import { vars } from '@/theme/index.css';
import clsx from '@/utils/clsx';

import { interactableBorderStyle } from '../index.css';
import { InputContext } from '../InputContext';
import { inputFieldContainerStyle, inputFieldStyle, selectIconStyle } from './inputField.css';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick'> {
  onClick?: () => void;
}

const InputField = ({ placeholder, onClick, ...inputProps }: InputFieldProps) => {
  const { isValid, type, borderPlacement } = useSafeContext(InputContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
    onClick?.();
  };

  return (
    <div 
      className={clsx(
        inputFieldContainerStyle({ type }), 
        borderPlacement === 'inputField' && interactableBorderStyle({ isValid }),
      )} 
      onClick={handleContainerClick}
    >
      <input
        className={inputFieldStyle}
        placeholder={placeholder}
        readOnly={type === 'select'}
        ref={inputRef}
        {...inputProps}
      />
      {type === 'select' &&
        <button 
          className={selectIconStyle}
          tabIndex={-1} // tab으로 버튼 선택 안 되게
          type='button'
        >
          <ChevronDown
            clickable
            fill={vars.color.Ref.Netural[500]}
            width={20}
          />
        </button>}
    </div>
  );
};

export default InputField;
