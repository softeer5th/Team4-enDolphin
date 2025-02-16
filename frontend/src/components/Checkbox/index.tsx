import { useId } from 'react';

import { useCheckbox } from '@/hooks/useCheckbox';

import { Check } from '../Icon';
import { CheckboxInput } from './CheckboxInput';
import { CheckboxLabel } from './CheckboxLabel';
import { checkboxStyle, containerStyle } from './index.css';
import type { CheckboxProps } from './type';

/**
 * @description Checkbox 컴포넌트.
 *
 * @param [value] - Checkbox를 Group 컴포넌트와 함께 사용할 때 Checkbox의 값.
 * @param [isChecked] - 외부에서 제어 시 Checkbox의 체크 여부.
 * @param [onToggleCheck] - 외부에서 제어 시 Checkbox의 체크 여부를 토글하는 함수.
 * @param [type] - Checkbox를 전체 선택 또는 단일 선택으로 사용할 때의 타입.
 * @param [size] - Checkbox의 크기.
 * @param [defaultChecked] - Checkbox의 기본 체크 여부.
 * @param [inputProps] - Checkbox의 input에 주입할 속성.
 * @param children - Checkbox의 내용.
 */
export const Checkbox = ({ 
  value, 
  isChecked,
  onToggleCheck,
  type = 'single', 
  size = 'md', 
  defaultChecked, 
  inputProps = {}, 
  children, 
}: CheckboxProps) => {
  const defaultId = `checkbox-${useId()}`;
  const id = inputProps?.id ?? defaultId;

  const { handleClickCheck, checked } = 
    useCheckbox({ value, defaultChecked, type, isChecked, onToggleCheck });

  return(
    <div className={containerStyle}>
      <span className={checkboxStyle({ size, style: checked ? 'selected' : 'rest' })}>
        {checked && <Check clickable width={16} />}
      </span>
      <CheckboxLabel
        id={id}
        size={size}
        style={checked ? 'selected' : 'rest'}
      >
        {children}
      </CheckboxLabel>
      <CheckboxInput
        checked={checked}
        handleClickCheck={handleClickCheck}
        id={id}
        inputProps={inputProps}
      />
    </div>
  ); 
};