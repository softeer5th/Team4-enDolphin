import { Flex } from '@/components/Flex';

import { FormProvider } from './FormProvider';
import MeetingDurationDropdown from './MeedtingDurationDropdown';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
import MeetingTitle from './MeetingTitle';

const DiscussionForm = () => (
  <FormProvider initialValues={{
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '',
    endTime: '',
    meetingTime: '',
    meetingMethod: '',
    deadline: new Date(),
  }}
  >
    <Flex
      direction='column'
      gap={800}
      width='27.875rem'
    >
      <MeetingTitle name='title' />
      <MeetingTimeDropdowns />
      <MeetingDurationDropdown name='meetingTime' />
      <MeetingMethodDropdown name='meetingMethod' />

    </Flex>
  </FormProvider>
);

export default DiscussionForm;