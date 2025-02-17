import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useClipboard } from '@/hooks/useClipboard';
import { vars } from '@/theme/index.css';

import type { DiscussionResponse } from '../../model';
import DiscussionInfo from './DiscussionInfo';
import { containerStyle } from './index.css';

const DiscussionCreateCard = ({ discussion }: { discussion: DiscussionResponse }) => {
  const { handleCopyToClipboard } = useClipboard();

  const handleClickShareButton = () => {
    // TODO: 링크 암호화
    handleCopyToClipboard(`http://localhost:5173/discussion/${discussion.id}`);
  };

  return (
    <Flex
      align='center'
      as='section'
      className={containerStyle}
      direction='column'
      gap={700}
    >
      <img
        alt='캘린더 이미지'
        src='/images/assets/calendar.webp'
        width={100}
      />
      <Text color={vars.color.Ref.Netural[900]} typo='h2'>일정 조율 생성 완료</Text>
      <Divider />
      <DiscussionInfo discussion={discussion} />
      <Flex justify='flex-end' width='100%'>
        <Button
          as={Link}
          size='xl'
          style='borderless'
          to='/home'
        >
          홈으로
        </Button>
        <Button onClick={handleClickShareButton} size='xl'>링크 공유</Button>
      </Flex>
    </Flex>
  );
};

export default DiscussionCreateCard;