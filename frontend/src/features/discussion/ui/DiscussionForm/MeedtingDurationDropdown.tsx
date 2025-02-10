import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingDurationDropdown = ({ name }: FormBaseValue) => {
  const { formState, handleUpdateField } = useFormContext();

  return (
    <Dropdown
      height={306}
      onChange={(value) => handleUpdateField(name, value)}
      selectedValue={formState[name].toString()}
      trigger={
        <Input.Single
          inputProps={{
            name,
            value: `${formState[name]}분`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleUpdateField(name, e.target.value),
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