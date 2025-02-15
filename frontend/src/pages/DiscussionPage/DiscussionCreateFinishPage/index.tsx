import { Flex } from '@/components/Flex';
import DiscussionCreateCard from '@/features/discussion/ui/DiscussionCreateCard';

import { pageContainerStyle } from './index.css';

const DiscussionCreateFinishPage = () => (
  <Flex align='center' className={pageContainerStyle}>
    <DiscussionCreateCard />
  </Flex>
);

export default DiscussionCreateFinishPage;