import { Flex } from '@/components/Flex';
import DiscussionCreateTitle from '@/features/discussion/ui/DiscussionCreateTitle';
import DiscussionForm from '@/features/discussion/ui/DiscussionForm';

import { discussionContainerStyle } from '../index.css';

const DiscussionCreatePage = () => (
  <Flex
    align='center'
    className={discussionContainerStyle}
    direction='column'
    gap={800}
    justify='flex-start'
  >
    <DiscussionCreateTitle
      subtitle='일정 조율에는 최대 15명이 참여가능해요'
      title='일정 조율 생성'
    />
    <DiscussionForm type='add' />
  </Flex>
);

export default DiscussionCreatePage;