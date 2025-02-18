import { Flex } from '@/components/Flex';
import type { DiscussionResponse } from '@/features/discussion/model';
import DiscussionCreateCard from '@/features/discussion/ui/DiscussionCreateCard';

import { pageContainerStyle } from './index.css';

const DiscussionCreateFinishPage = ({ discussion }: { discussion: DiscussionResponse }) => (
  <Flex align='center' className={pageContainerStyle}>
    <DiscussionCreateCard discussion={discussion} />
  </Flex>
);

export default DiscussionCreateFinishPage;