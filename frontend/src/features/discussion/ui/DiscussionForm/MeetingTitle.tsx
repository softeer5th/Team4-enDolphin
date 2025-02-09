import Input from '@/components/Input';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingTitle = ({ name }: FormBaseValue) => {
  const { handleChange } = useFormContext();
  return (
    <Input.Single
      error='필수 항목입니다.'
      inputProps={{
        name,
        onChange: handleChange,
      }}
      label='제목'
      placeholder='일정 제목은 필수에요'
      required
      type='text'
    />
  );
};

export default MeetingTitle;