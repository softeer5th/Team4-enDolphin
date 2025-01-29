import type { InputHTMLAttributes, PropsWithChildren }  from 'react';
import { useId, useState } from 'react';

import { Check } from '../Icon';
import type { Typo } from '../Text';
import { Text } from '../Text';
import { checkboxStyle, containerStyle, inputStyle, labelStyle } from './index.css';

interface CheckboxProps extends PropsWithChildren {
  size?: 'sm' | 'md';
  defaultChecked?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * @description Checkbox 컴포넌트.
 *
 * @param [size] - Checkbox의 크기.
 * @param [defaultChecked] - Checkbox의 기본 체크 여부.
 * @param [inputProps] - Checkbox의 input에 주입할 속성.
 * @param children - Checkbox의 내용.
 */
export const Checkbox = ({ size = 'md', defaultChecked, inputProps, children }: CheckboxProps) => {
  const defaultId = `checkbox-${useId()}`;
  const id = inputProps?.id ?? defaultId;

  const fontMap: Record<typeof size, Typo> = {
    sm: 'caption',
    md: 'b2M',
  };

  const [checked, setChecked] = useState(defaultChecked || false);
  const checkStyleName = checked ? 'selected' : 'rest';
  
  const handleClickCheck = () => {
    setChecked((checked) => !checked);
  };
  
  return(
    <div className={containerStyle} onClick={handleClickCheck}>
      <span className={checkboxStyle({ size, style: checkStyleName })}>
        {checked && <Check width={16}/>}
      </span>
      <label className={labelStyle({ size, style: checkStyleName })} htmlFor={id}>
        <Text typo={fontMap[size]}>{children}</Text>
      </label>
      <input 
        checked={checked}
        className={inputStyle}
        id={id}
        type='checkbox'
        {...inputProps}
        onChange={handleClickCheck} />
    </div>
  ); 
};