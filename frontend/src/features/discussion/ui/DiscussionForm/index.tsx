import { Flex } from '@/components/Flex';
import { formatDateToDotString } from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import FormButton from './FormButton';
import { FormProvider } from './FormProvider';
import MeetingDateDropdowns from './MeetingDateDropdowns';
import MeetingDeadlineDropdown from './MeetingDeadlineDropdown';
import MeetingDurationDropdown from './MeetingDurationDropdown';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
import MeetingTitle from './MeetingTitle';
import type { FormType } from './type';

const DiscussionForm = (
  { type, initialValues }: { type: FormType; initialValues?: DiscussionRequest },
) => {
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();

  return (
    <FormProvider initialValues={initialValues || {
      title: '',
      dateRangeStart: formatDateToDotString(today),
      dateRangeEnd: formatDateToDotString(new Date(today.getTime() + SEVEN_DAYS)),
      timeRangeStart: '09:00',
      timeRangeEnd: '09:00',
      duration: 60,
      meetingMethod: null,
      deadline: formatDateToDotString(new Date(today.getTime() + SEVEN_DAYS)),
    }}
    >
      <Flex
        direction='column'
        gap={800}
        width='27.875rem'
      >
        <MeetingTitle name='title' />
        <MeetingDateDropdowns />
        <MeetingTimeDropdowns />
        <MeetingDurationDropdown name='duration' />
        <MeetingMethodDropdown name='meetingMethod' />
        <MeetingDeadlineDropdown name='deadline' />
        <FormButton type={type} />
      </Flex>
    </FormProvider>
  );
};

export default DiscussionForm;