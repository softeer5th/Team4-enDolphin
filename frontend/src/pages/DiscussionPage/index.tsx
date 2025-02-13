import { Flex } from '@/components/Flex';
import DiscussionMemberCheckbox from '@/features/discussion/ui/DiscussionMemberCheckbox';
import DiscussionTab from '@/features/discussion/ui/DiscussionTab';
import DiscussionTitle from '@/features/discussion/ui/DiscussionTitle';

const DiscussionPage = () =>(
  <Flex direction='column'>
    <DiscussionTitle />
    <Flex gap={700} width='100%'>
      <DiscussionMemberCheckbox members={[
        { id: 1, name: '김동권', email: 'a@naver.com', picture: 'https://picsum.photos/200' },
        { id: 2, name: '김동현', email: 'b@naver.com', picture: 'https://picsum.photos/200' },
        { id: 3, name: '이재영', email: 'c@naver.com', picture: 'https://picsum.photos/200' },
        { id: 4, name: '이현영', email: 'd@naver.com', picture: 'https://picsum.photos/200' },
      ]}
      />
      <DiscussionTab />
    </Flex>
  </Flex>
);

export default DiscussionPage;