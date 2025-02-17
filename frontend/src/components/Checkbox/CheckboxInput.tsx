import type { ChangeEvent } from 'react';

import { inputStyle } from './index.css';
import type { CheckboxProps } from './type';

export const CheckboxInput = ({
  checked,
  handleClickCheck,
  id,
  inputProps = {},
}: {
  checked: boolean;
  handleClickCheck: () => void;
  id: string;
  inputProps?: CheckboxProps['inputProps'];
}) => {
  const { onChange, checked: inputChecked, ...restInputProps } = inputProps;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleClickCheck();
    onChange?.(e);
  };

  return (
    <input 
      checked={inputChecked ?? checked}
      className={inputStyle}
      id={id}
      onChange={handleChange}
      type='checkbox'
      {...restInputProps}
    />
  );
};