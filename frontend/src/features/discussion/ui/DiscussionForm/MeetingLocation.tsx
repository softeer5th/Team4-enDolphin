import Input from '@/components/Input';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';

const MeetingLocation = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, handleUpdateField } = useFormContext();
  if (!formState.meetingMethod) return null;

  return (
    <Input.Single
      inputProps={{
        name,
        value: formState[name] || '',
        onChange: (e) => handleUpdateField(name, e.target.value),
      }}
      label='미팅 장소'
      type='text'
    />
  );
};

export default MeetingLocation;