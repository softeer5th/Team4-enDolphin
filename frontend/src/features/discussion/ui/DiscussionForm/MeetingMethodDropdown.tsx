import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';

import type { DiscussionRequestDTO } from '../../model';
import { useFormContext } from './FormContext';

const MeetingMethodDropdown = ({ name }: { name: keyof DiscussionRequestDTO }) => {
  const { formState, handleUpdateField } = useFormContext();

  return (
    <Dropdown
      height={138}
      onChange={(value) => handleUpdateField(name, value)}
      selectedValue={formState[name] as string}
      trigger={
        <Input.Single
          inputProps={{
            name,
            value: formState[name] || '',
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleUpdateField(name, e.target.value),
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
};

export default MeetingMethodDropdown;