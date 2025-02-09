import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingDurationDropdown = ({ name }: FormBaseValue) => {
  const { valuesRef, handleChange } = useFormContext();

  const handleChangeDropdown = (value: string) => {
    if (valuesRef?.current) {
      valuesRef.current[name] = value;
    }
    const event = {
      target: { name, value },
    } as ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };
  return (
    <Dropdown
      height={306}
      onChange={handleChangeDropdown}
      selectedValue={valuesRef.current[name].toString()}
      trigger={
        <Input.Single
          inputProps={{
            name,
            value: `${valuesRef.current[name]}분`,
            onChange: handleChange,
          }}
          label='미팅 시간'
          required
          type='select'
        />
      }
      width={210}
    >
      {MINUTES_HALF(6, 30).map((minute) => (
        <Dropdown.Item key={minute} value={minute.toString()}>
          {minute}
          분
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default MeetingDurationDropdown;