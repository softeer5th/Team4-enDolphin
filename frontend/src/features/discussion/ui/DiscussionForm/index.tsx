import { Flex } from '@/components/Flex';
import { formatDateToTimeString } from '@/utils/date';
import { formatDateToString } from '@/utils/date/format';

import type { DiscussionRequestDTO } from '../../model';
import FormButton from './FormButton';
import { FormProvider } from './FormProvider';
import MeetingDurationDropdown from './MeetingDurationDropdown';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
import MeetingTitle from './MeetingTitle';
import type { FormType } from './type';

const DiscussionForm = (
  { type, initialValues }: { type: FormType; initialValues?: DiscussionRequestDTO },
) => {
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();

  return (
    <FormProvider initialValues={initialValues || {
      title: '',
      dateRangeStart: formatDateToString(today),
      dateRangeEnd: formatDateToString(today),
      timeRangeStart: '09:00',
      timeRangeEnd: '09:00',
      duration: 60,
      meetingMethod: null,
      deadline: formatDateToString(new Date(today.getTime() + SEVEN_DAYS)),
    }}
    >
      <Flex
        direction='column'
        gap={800}
        width='27.875rem'
      >
        <MeetingTitle name='title' />
        <MeetingTimeDropdowns />
        <MeetingDurationDropdown name='duration' />
        <MeetingMethodDropdown name='meetingMethod' />
        <FormButton type={type} />
      </Flex>
    </FormProvider>
  );
};

export default DiscussionForm;