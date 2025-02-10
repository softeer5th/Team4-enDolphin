import { Flex } from '@/components/Flex';
import DiscussionCreateTitle from '@/features/discussion/ui/DiscussionCreateTitle';
import DiscussionForm from '@/features/discussion/ui/DiscussionForm';

const DiscussionEditPage = () => (
  <Flex
    align='center'
    direction='column'
    gap={800}
    height='100vh'
  >
    <DiscussionCreateTitle title='일정 조율 수정' />
    <DiscussionForm 
      initialValues={{
        title: '기업디(3) 첫 팀플',
        startDate: new Date(),
        endDate: new Date(),
        startTime: '60',
        endTime: '120',
        meetingTime: '60',
        meetingMethod: '온라인',
        deadline: new Date(),
      }}
      type='edit'
    />
  </Flex>
);

export default DiscussionEditPage;