import Input from '@/components/Input';

import { useFormContext } from './FormContext';
import type { FormBaseValue } from './type';

const MeetingTitle = ({ name }: FormBaseValue) => {
  const { formState, validationRef, setValidation, handleUpdateField } = useFormContext();
  setValidation(name, () => !!formState[name]);

  return (
    <Input.Single
      error='필수 항목입니다.'
      inputProps={{
        name,
        value: formState[name] || '',
        onChange: (e) => handleUpdateField(name, e.target.value),
      }}
      isValid={validationRef.current[name]?.(formState[name])}
      label='제목'
      placeholder='일정 제목은 필수에요'
      required
      type='text'
    />
  );
};

export default MeetingTitle;