import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { formatMinutesToTimeString } from '@/utils/date';

import { useFormContext } from './FormContext';
import type { MeetingFormValues } from './type';

const MeetingTimeDropdowns = () => (
  <Input.Multi
    hint='일정을 잡고 싶은 시간 범위를 입력해주세요'
    label='시간 설정'
    required
    separator='~'
    type='select'
  >
    <TimeDropdown name='startTime' />
    <TimeDropdown name='endTime' />
  </Input.Multi>
);

const TimeDropdown = ({ name }: { name: keyof MeetingFormValues }) => {
  const { handleChange, valuesRef } = useFormContext();
  return (
    <Dropdown
      height={168}
      onChange={(value) => handleChange(
        { target: { name, value } } as ChangeEvent<HTMLInputElement>,
      )}
      selectedValue={valuesRef.current[name].toString()}
      trigger={ 
        <Input.Multi.InputField
          name={name}
          onChange={handleChange}
          value={formatMinutesToTimeString(+valuesRef.current[name])}
        />
      }
      width='100%'
    >
      {MINUTES_HALF(24, 0).map((minute) => (
        <Dropdown.Item key={minute} value={minute.toString()}>
          {formatMinutesToTimeString(minute)}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default MeetingTimeDropdowns;