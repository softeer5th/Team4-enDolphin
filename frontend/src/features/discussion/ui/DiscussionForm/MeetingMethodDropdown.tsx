import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';

import type { DiscussionRequest, MeetingMethodENUM } from '../../model';
import { useFormContext } from './FormContext';

const MeetingMethodDropdown = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, handleUpdateField } = useFormContext();
  const methodMap: Record<MeetingMethodENUM | '', string> = {
    OFFLINE: '만나서',
    ONLINE: '온라인 미팅',
    '': '선택안함',
  };

  return (
    <Dropdown
      onChange={(value) => handleUpdateField(name, value || null)}
      selectedValue={formState[name] as string}
      trigger={
        <Input.Single
          inputProps={{
            name,
            value: methodMap[formState[name] as MeetingMethodENUM] ?? '선택안함',
            onChange: (e: ChangeEvent<HTMLInputElement>) => 
              handleUpdateField(name, e.target.value || null),
          }}
          label='미팅 방법'
          type='select'
        />
      }
      width='100%'
    >
      <Dropdown.Contents>
        <Dropdown.Item value='OFFLINE'>{methodMap['OFFLINE']}</Dropdown.Item>
        <Dropdown.Item value='ONLINE'>{methodMap['ONLINE']}</Dropdown.Item>
        <Dropdown.Item value=''>{methodMap['']}</Dropdown.Item>
      </Dropdown.Contents>
    </Dropdown>
  );
};

export default MeetingMethodDropdown;