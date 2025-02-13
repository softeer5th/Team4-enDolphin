import { Flex } from '@/components/Flex';
import DiscussionCalendar from '@/features/discussion/ui/DiscussionCalendar';
import DiscussionMemberCheckbox from '@/features/discussion/ui/DiscussionMemberCheckbox';

const DiscussionPage = () =>(
  <Flex>
    <DiscussionMemberCheckbox members={[
      { id: 1, name: '김동권', email: 'a@naver.com', picture: 'https://picsum.photos/200' },
      { id: 2, name: '김동현', email: 'b@naver.com', picture: 'https://picsum.photos/200' },
      { id: 3, name: '이재영', email: 'c@naver.com', picture: 'https://picsum.photos/200' },
      { id: 4, name: '이현영', email: 'd@naver.com', picture: 'https://picsum.photos/200' },
    ]}
    />
    <DiscussionCalendar />
  </Flex>
);

export default DiscussionPage;