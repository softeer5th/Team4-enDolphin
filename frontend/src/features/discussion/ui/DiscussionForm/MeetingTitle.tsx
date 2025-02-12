import Input from '@/components/Input';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingTitle = ({ name }: { name: keyof DiscussionRequest }) => {
  const { 
    formState, 
    validationRef, 
    setValidation, 
    isSubmitted, 
    handleUpdateField, 
  } = useFormContext();
  setValidation(name, () => !!formState[name]);

  return (
    <Input.Single
      error='필수 항목입니다.'
      inputProps={{
        name,
        value: formState[name] || '',
        onChange: (e) => handleUpdateField(name, e.target.value),
      }}
      isValid={!isSubmitted || validationRef.current[name]?.(formState[name])}
      label='제목'
      placeholder='일정 제목은 필수에요'
      required
      type='text'
    />
  );
};

export default MeetingTitle;