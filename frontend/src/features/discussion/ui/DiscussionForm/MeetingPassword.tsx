import Input from '@/components/Input';
import { PASSWORD } from '@/constants/regex';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingPassword = ({ name }: { name: keyof DiscussionRequest }) => {
  const { 
    formState,
    setValidation, 
    errors,
    isValid,
    handleUpdateField, 
  } = useFormContext();
  
  setValidation(name, () => {
    if (!formState[name]) return '';
    if (!PASSWORD.test(formState[name] as string)) return '4~6자리의 숫자로 구성된 비밀번호를 입력해주세요';
    return '';
  });

  return (
    <Input.Single
      error={errors(name)}
      hint='4~6자리의 숫자로 구성된 논의 비밀번호를 입력해주세요'
      inputProps={{
        name,
        value: formState[name] || '',
        onChange: (e) => handleUpdateField(name, e.target.value),
        type: 'password',
      }}
      isValid={isValid(name)}
      label='비밀번호'
      placeholder='123456'
      type='text'
    />
  );
};

export default MeetingPassword;