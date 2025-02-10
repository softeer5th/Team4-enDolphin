import { Flex } from '@/components/Flex';

import FormButton from './FormButton';
import { FormProvider } from './FormProvider';
import MeetingDurationDropdown from './MeedtingDurationDropdown';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
import MeetingTitle from './MeetingTitle';
import type { FormType, MeetingFormValues } from './type';

const DiscussionForm = (
  { type, initialValues }: { type: FormType; initialValues?: MeetingFormValues },
) => (
  <FormProvider initialValues={initialValues || {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '0',
    endTime: '0',
    meetingTime: '60',
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
      <FormButton type={type} />
    </Flex>
  </FormProvider>
);

export default DiscussionForm;