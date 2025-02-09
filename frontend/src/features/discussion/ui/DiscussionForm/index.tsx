import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { useFormControl } from '@/hooks/useFormControl';

import { buttonStyle } from './index.css';
import MeetingDurationDropdown from './MeedtingDurationDropdown';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
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
    <Flex
      direction='column'
      gap={800}
      width='27.875rem'
    >
      <MeetingTitle handleChange={handleChange} value={values.title} />
      <MeetingTimeDropdowns
        endTime={values.endTime}
        handleChange={handleChange}
        startTime={values.startTime}
      />
      <MeetingDurationDropdown handleChange={handleChange} value={values.meetingTime} />
      <MeetingMethodDropdown handleChange={handleChange} value={values.meetingMethod} />
      <Button className={buttonStyle} size='xl'>생성하기</Button>
    </Flex>
  );
};

export default DiscussionForm;