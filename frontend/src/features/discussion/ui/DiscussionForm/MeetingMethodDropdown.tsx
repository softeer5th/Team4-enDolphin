import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';

interface MeetingMethodDropdownProps {
  value: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

const MeetingMethodDropdown = ({ value, handleChange }: MeetingMethodDropdownProps) => (
  <Dropdown
    height={138}
    onChange={(value) => handleChange({ name: 'meetingMethod', value })}
    selectedValue={value}
    trigger={
      <Input.Single
        inputProps={{
          name: 'title',
          value,
          onChange: (e) => handleChange(e.target),
        }}
        label='미팅 방법'
        type='select'
      />
    }
    width='100%'
  >
    <Dropdown.Item value='만나서'>만나서</Dropdown.Item>
    <Dropdown.Item value='온라인 미팅'>온라인 미팅</Dropdown.Item>
    <Dropdown.Item value='전화'>전화</Dropdown.Item>
  </Dropdown>
);

export default MeetingMethodDropdown;