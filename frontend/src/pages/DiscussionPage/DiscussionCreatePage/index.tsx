import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import DiscussionForm from '@/features/discussion/ui/DiscussionForm';
import { vars } from '@/theme/index.css';

const DiscussionCreatePage = () => (
  <>
    <Flex
      align='center'
      direction='column'
      gap={800}
      height='100vh'
    >
      <Flex
        direction='column'
        gap={300}
        justify='flex-start'
        width='27.875rem'
      >
        <Text color={vars.color.Ref.Netural[800]} typo='h2'>일정 조율 생성</Text>
        <Text color={vars.color.Ref.Netural[500]}>일정 조율에는 최대 15명이 참여가능해요</Text>
      </Flex>
      <DiscussionForm />
    </Flex>
  </>
);

export default DiscussionCreatePage;