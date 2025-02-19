import { Flex } from '@/components/Flex';
import DiscussionMemberCheckbox from '@/features/discussion/ui/DiscussionMemberCheckbox';
import DiscussionTab from '@/features/discussion/ui/DiscussionTab';
import DiscussionTitle from '@/features/discussion/ui/DiscussionTitle';
import { useFormState } from '@/hooks/useFormState';

import { discussionContentStyle } from './index.css';
import type { MemberContextProps } from './MemberContext';
import { MemberContext } from './MemberContext';

const DiscussionPage = () => (
  <Flex
    direction='column'
    height='calc(100vh - 112px)'
    justify='flex-start'
    width='100%'
  >
    <DiscussionTitle />
    <Flex
      className={discussionContentStyle}
      gap={700}
      height='calc(100% - 48px)'
      width='100%'
    >
      <MemberContext.Provider value={useFormState<MemberContextProps>({ checkedList: null })}>
        <DiscussionMemberCheckbox />
        <DiscussionTab />
      </MemberContext.Provider>
    </Flex>
  </Flex>
);

export default DiscussionPage;