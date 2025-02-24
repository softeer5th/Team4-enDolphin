import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { 
  formatMinutesToTimeString, 
  formatNumberToTimeString, 
  formatTimeStringToNumber, 
} from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingTimeDropdowns = () => {
  const { formState, errors, setValidation, isValid } = useFormContext();

  const validateTimeRange = () => {
    const start = formatTimeStringToNumber(formState.timeRangeStart);
    const end = formatTimeStringToNumber(formState.timeRangeEnd);
    if (start >= end) return '종료 시간은 시작 시간보다 빠를 수 없습니다.';
    return '';
  };
  setValidation('timeRangeStart', validateTimeRange);

  return (
    <Input.Multi
      error={errors('timeRangeStart')}
      hint='일정을 잡고 싶은 시간 범위를 입력해주세요'
      isValid={isValid('timeRangeStart')}
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
      <Dropdown.Contents height={168}>
        {MINUTES_HALF(24, 0).map((minute) => (
          <Dropdown.Item key={minute} value={formatNumberToTimeString(minute)}>
            {formatMinutesToTimeString(minute)}
          </Dropdown.Item>
        ))}
      </Dropdown.Contents>
    </Dropdown>
  );
};

export default MeetingTimeDropdowns;