import { Flex } from '@/components/Flex';
import DiscussionCreateTitle from '@/features/discussion/ui/DiscussionCreateTitle';
import DiscussionForm from '@/features/discussion/ui/DiscussionForm';

import { discussionContainerStyle } from '../index.css';

const DiscussionEditPage = () => (
  <Flex
    align='center'
    className={discussionContainerStyle}
    direction='column'
    gap={800}
    justify='flex-start'
  >
    <DiscussionCreateTitle title='일정 조율 수정' />
    <DiscussionForm 
      initialValues={{
        title: '기업디(3) 첫 팀플',
        dateRangeStart: '2021-10-10',
        dateRangeEnd: '2021-10-10',
        timeRangeStart: '09:00',
        timeRangeEnd: '12:00',
        duration: 60,
        meetingMethod: 'OFFLINE',
        deadline: '2021-10-10',
      }}
      type='edit'
    />
  </Flex>
);

export default DiscussionEditPage;