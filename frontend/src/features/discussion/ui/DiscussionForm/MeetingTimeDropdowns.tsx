import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';
import { MINUTES_HALF } from '@/constants/date';
import { formatMinutesToTimeString } from '@/utils/date';

interface MeetingTimeDropdownsProps {
  startTime: string;
  endTime: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

const MeetingTimeDropdowns = ({ startTime, endTime, handleChange }: MeetingTimeDropdownsProps ) => (
  <Input.Multi
    label='시간 설정'
    required
    separator='~'
    type='select'
  >
    <TimeDropdown
      handleChange={handleChange}
      name='startTime'
      value={startTime}
    />
    <TimeDropdown
      handleChange={handleChange}
      name='endTime'
      value={endTime}
    />
  </Input.Multi>
);

const TimeDropdown = (
  { value, name, handleChange }: 
  { 
    value: string; 
    name: string; 
    handleChange: ({ name, value }: { name: string; value: string }) => void; 
  },
) => (
  <Dropdown
    height={168}
    onChange={(value) => handleChange({ name, value })}
    selectedValue={value}
    trigger={
      <Input.Multi.InputField
        name={name}
        onChange={(e) => handleChange({ name, value: e.target.value })}
        readOnly
        value={formatMinutesToTimeString(+value)}
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

export default MeetingTimeDropdowns;