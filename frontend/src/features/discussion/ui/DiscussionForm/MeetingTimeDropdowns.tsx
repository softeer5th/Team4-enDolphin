import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { 
  formatMinutesToTimeString, 
  formatNumberToTimeString, 
  formatTimeStringToNumber, 
} from '@/utils/date';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingTimeDropdowns = () => {
  const { formState, validationRef, setValidation } = useFormContext();

  const validateDateRange = () => {
    const start = formatTimeStringToNumber(formState.timeRangeStart);
    const end = formatTimeStringToNumber(formState.timeRangeEnd);
    return start < end;
  };

  setValidation('timeRangeStart', validateDateRange);

  return (
    <Input.Multi
      error='시작 시간이 종료 시간보다 빠를 수 없습니다.'
      hint='일정을 잡고 싶은 시간 범위를 입력해주세요'
      isValid={validationRef.current.timeRangeStart?.(formState.timeRangeStart)}
      label='시간 설정'
      required
      separator='~'
      type='select'
    >
      <TimeDropdown name='timeRangeStart' />
      <TimeDropdown name='timeRangeEnd' />
    </Input.Multi>
  );
};

const TimeDropdown = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, handleUpdateField } = useFormContext();

  return (
    <Dropdown
      height={168}
      onChange={(value) => handleUpdateField(name, value)}
      selectedValue={formState[name] as string}
      trigger={ 
        <Input.Multi.InputField
          name={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpdateField(name, e.target.value)}
          value={formatMinutesToTimeString(formatTimeStringToNumber(formState[name] as string))}
        />
      }
      width='100%'
    >
      {MINUTES_HALF(24, 0).map((minute) => (
        <Dropdown.Item key={minute} value={formatNumberToTimeString(minute)}>
          {formatMinutesToTimeString(minute)}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default MeetingTimeDropdowns;