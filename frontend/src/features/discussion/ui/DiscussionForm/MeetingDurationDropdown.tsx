import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { formatTimeStringToNumber } from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingDurationDropdown = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, errors, setValidation, isValid, handleUpdateField } = useFormContext();
  const validateDuration = () => {
    const startTime = formatTimeStringToNumber(formState.timeRangeStart);
    const endTime = formatTimeStringToNumber(formState.timeRangeEnd);
    if (endTime - startTime < formState.duration) return '회의 소요시간은 논의 범위를 초과할 수 없습니다.';
    return '';
  };
  setValidation(name, validateDuration);

  return (
    <Dropdown
      height={306}
      onChange={(value) => handleUpdateField(name, value)}
      selectedValue={formState[name]?.toString() || ''}
      trigger={
        <Input.Single
          error={errors(name)}
          inputProps={{
            name,
            value: `${formState[name]}분`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleUpdateField(name, e.target.value),
          }}
          isValid={isValid(name)}
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