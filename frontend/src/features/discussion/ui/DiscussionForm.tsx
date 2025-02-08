import { Flex } from '@/components/Flex';
import { useFormControl } from '@/hooks/useFormControl';

import MeetingTitle from './MeetingTitle';

const DiscussionForm = () => {
  const { values, handleChange } = useFormControl({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    meetingTime: '',
    meetingMethod: '',
    deadline: '',
  });

  return (
    <Flex direction='column' width='27.875rem'>
      <MeetingTitle handleChange={handleChange} value={values.title} />
    </Flex>
  );
};

export default DiscussionForm;