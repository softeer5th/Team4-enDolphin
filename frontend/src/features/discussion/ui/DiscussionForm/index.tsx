import { Flex } from '@/components/Flex';
import { formatDateToBarString } from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import FormButton from './FormButton';
import { FormProvider } from './FormProvider';
import MeetingDateDropdowns from './MeetingDateDropdowns';
import MeetingDeadlineDropdown from './MeetingDeadlineDropdown';
import MeetingDurationDropdown from './MeetingDurationDropdown';
import MeetingLocation from './MeetingLocation';
import MeetingMethodDropdown from './MeetingMethodDropdown';
import MeetingPassword from './MeetingPassword';
import MeetingTimeDropdowns from './MeetingTimeDropdowns';
import MeetingTitle from './MeetingTitle';
import type { FormType } from './type';

const DiscussionForm = (
  { type, initialValues }: { type: FormType; initialValues?: DiscussionRequest },
) => {
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();

  return (
    <FormProvider 
      initialValues={initialValues || {
        title: '일정 조율 제목',
        dateRangeStart: formatDateToBarString(today),
        dateRangeEnd: formatDateToBarString(new Date(today.getTime() + SEVEN_DAYS)),
        timeRangeStart: '20:00',
        timeRangeEnd: '21:00',
        duration: 60,
        meetingMethod: null,
        deadline: formatDateToBarString(new Date(today.getTime() + SEVEN_DAYS)),
      }}
    >
      <Flex
        direction='column'
        gap={800}
        width='27.875rem'
      >
        <MeetingTitle />
        <MeetingDateDropdowns />
        <MeetingTimeDropdowns />
        <MeetingDurationDropdown name='duration' />
        <MeetingMethodDropdown name='meetingMethod' />
        <MeetingLocation name='location' />
        <MeetingDeadlineDropdown name='deadline' />
        <MeetingPassword name='password' />
        <FormButton type={type} />
      </Flex>
    </FormProvider>
  );
};

export default DiscussionForm;