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
          value: `${value}분`,
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
    {MINUTES_HALF(6, 30).map((minute) => (
      <Dropdown.Item key={minute} value={minute.toString()}>
        {minute}
        분
      </Dropdown.Item>
    ))}
  </Dropdown>
);

export default MeetingDurationDropdown;