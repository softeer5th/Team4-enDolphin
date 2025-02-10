import Input from '@/components/Input';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingTitle = ({ name }: FormBaseValue) => {
  const { handleUpdateField } = useFormContext();
  return (
    <Input.Single
      inputProps={{
        name,
        onChange: (e) => handleUpdateField(name, e.target.value),
      }}
      label='제목'
      placeholder='일정 제목은 필수에요'
      required
      type='text'
    />
  );
};

export default MeetingTitle;