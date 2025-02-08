import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { formatMinutesToTimeString } from '@/utils/date';

interface MeetingDurationDropdownProps {
  value: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

const MeetingDurationDropdown = ({ value, handleChange }: MeetingDurationDropdownProps) => (
  <Dropdown
    height={306}
    onChange={(value) => handleChange({ name: 'meetingTime', value })}
    selectedValue={value}
    trigger={
      <Input.Single
        inputProps={{
          name: 'meetingTime',
          value: formatMinutesToTimeString(Number(value)),
          onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target),
          readOnly: true,
        }}
        label='미팅 시간'
        required
        type='select'
      />
    }
    width={210}
  >
    {MINUTES_HALF.map((minute) => (
      <Dropdown.Item key={minute} value={minute.toString()}>
        {formatMinutesToTimeString(minute)}
      </Dropdown.Item>
    ))}
  </Dropdown>
);

export default MeetingDurationDropdown;