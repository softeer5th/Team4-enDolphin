import Input from '@/components/Input';
import { PASSWORD } from '@/constants/regex';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingPassword = ({ name }: { name: keyof DiscussionRequest }) => {
  const { 
    formState, 
    validationRef, 
    setValidation, 
    isSubmitted, 
    handleUpdateField, 
  } = useFormContext();
  setValidation(name, () => !formState[name] || PASSWORD.test(formState[name] as string));

  return (
    <Input.Single
      hint='4~6자리의 숫자로 구성된 논의 비밀번호를 입력해주세요'
      inputProps={{
        name,
        value: formState[name] || '',
        onChange: (e) => handleUpdateField(name, e.target.value),
      }}
      isValid={!isSubmitted || validationRef.current[name]?.(formState[name])}
      label='비밀번호'
      placeholder='123456'
      type='text'
    />
  );
};

export default MeetingPassword;