import Input from '@/components/Input';

import { useFormContext } from './FormContext';

const MeetingTitle = () => {
  const { 
    formState, 
    isValid,
    setValidation, 
    errors, 
    handleUpdateField, 
  } = useFormContext();
  setValidation('title', () => {
    if (!formState['title']) return '일정 제목은 필수에요';
    if (formState.title.length > 15) return '15자 이내로 입력해주세요';
    return '';
  });

  return (
    <Input.Single
      error={errors('title')}
      inputProps={{
        name: 'title',
        value: formState['title'] || '',
        onChange: (e) => handleUpdateField('title', e.target.value),
      }}
      isValid={isValid('title')}
      label='제목'
      placeholder='일정 제목은 필수에요'
      required
      type='text'
    />
  );
};

export default MeetingTitle;