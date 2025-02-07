import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useClipboard } from '@/hooks/useClipboard';
import { vars } from '@/theme/index.css';

import DiscussionInfo from './DiscussionInfo';
import { containerStyle } from './index.css';

const DiscussionCreateCard = () => {
  const { handleCopyToClipboard } = useClipboard();

  const handleClickShareButton = () => {
    handleCopyToClipboard('논의 주소');
  };

  return (
    <Flex
      align='center'
      className={containerStyle}
      direction='column'
      gap={700}
    >
      <img src='/images/assets/calendar.webp' width={100} />
      <Text color={vars.color.Ref.Netural[900]} typo='h2'>일정 조율 생성 완료</Text>
      <Divider />
      <DiscussionInfo />
      <Flex justify='flex-end' width='100%'>
        <Button
          as={Link}
          size='xl'
          style='borderless'
          to='/'
        >
          홈으로
        </Button>
        <Button onClick={handleClickShareButton} size='xl'>링크 공유</Button>
      </Flex>
    </Flex>
  );
};

export default DiscussionCreateCard;