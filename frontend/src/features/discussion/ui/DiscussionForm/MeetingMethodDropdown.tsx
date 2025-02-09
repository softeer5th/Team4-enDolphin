import type { ChangeEvent } from 'react';

import { Dropdown } from '@/components/Dropdown';
import Input from '@/components/Input';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingMethodDropdown = ({ name }: FormBaseValue) => {
  const { valuesRef, handleChange } = useFormContext();

  const handleChangeDropdown = (value: string) => {
    if (valuesRef?.current) {
      valuesRef.current[name] = value;
    }
    const event = {
      target: { name, value },
    } as ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };
  
  return (
    <Dropdown
      height={138}
      onChange={handleChangeDropdown}
      selectedValue={valuesRef.current[name].toString()}
      trigger={
        <Input.Single
          inputProps={{
            name,
            onChange: handleChange,
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