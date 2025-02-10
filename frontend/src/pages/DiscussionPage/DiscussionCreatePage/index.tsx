import { Flex } from '@/components/Flex';
import DiscussionCreateTitle from '@/features/discussion/ui/DiscussionCreateTitle';
import DiscussionForm from '@/features/discussion/ui/DiscussionForm';

const DiscussionCreatePage = () => (
  <Flex
    align='center'
    direction='column'
    gap={800}
    height='100vh'
  >
    <DiscussionCreateTitle
      subtitle='일정 조율에는 최대 15명이 참여가능해요'
      title='일정 조율 생성'
    />
    <DiscussionForm type='add' />
  </Flex>
);

export default DiscussionCreatePage;