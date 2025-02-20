import type { ChangeEvent, InputHTMLAttributes, SetStateAction  }  from 'react';
import { useId } from 'react';

import { useCheckbox } from '@/hooks/useCheckbox';

import { checkboxStyle, containerStyle, inputStyle } from './index.css';

interface ToggleProps {
  value?: number;
  isChecked?: boolean;
  onToggleCheck?: (prev: SetStateAction<boolean>) => void;
  type?: 'all' | 'single';
  defaultChecked?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * @description Toggle 컴포넌트.
 *
 * @param [value] - Toggle를 Group 컴포넌트와 함께 사용할 때 Toggle의 값.
 * @param [isChecked] - 외부에서 제어 시 Toggle의 체크 여부.
 * @param [onToggleCheck] - 외부에서 제어 시 Toggle의 체크 여부를 토글하는 함수.
 * @param [type] - Toggle를 전체 선택 또는 단일 선택으로 사용할 때의 타입.
 * @param [defaultChecked] - Toggle의 기본 체크 여부.
 * @param [inputProps] - Toggle의 input에 주입할 속성.
 */
export const Toggle = ({ 
  value, 
  isChecked,
  onToggleCheck,
  type = 'single', 
  defaultChecked, 
  inputProps = {},
}: ToggleProps) => {
  const defaultId = `checkbox-${useId()}`;
  const id = inputProps?.id ?? defaultId;

  const { handleClickCheck, checked } = 
    useCheckbox({ value, defaultChecked, type, isChecked, onToggleCheck });
  const { onChange, checked: inputChecked, ...restInputProps } = inputProps;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleClickCheck();
    onChange?.(e);
  };

  return(
    <label
      aria-checked={checked}
      className={containerStyle({ style: checked ? 'selected' : 'rest' })} 
      htmlFor={id}
      role='switch'
    >
      <span className={checkboxStyle({ style: checked ? 'selected' : 'rest' })} />
      <input 
        aria-hidden='true'
        checked={inputChecked ?? checked}
        className={inputStyle}
        id={id}
        type='checkbox'
        {...restInputProps}
        onChange={handleChange}
      />
    </label>
  ); 
};