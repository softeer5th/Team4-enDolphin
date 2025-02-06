import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

const Error = () => (
  <Flex
    align='center'
    direction='column'
    gap={300}
  >
    <img
      height={180}
      src='/images/assets/error.png'
      width={180}
    />
    <Text color={vars.color.Ref.Netural[800]} typo='h3'>유효하지 않은 링크입니다.</Text>
    <Text color={vars.color.Ref.Netural[500]} typo='b2M'>링크가 삭제되거나 변경되었어요.</Text>
    <Button
      as={Link}
      size='lg'
      style='weak'
      to='/'
    >
      홈으로
    </Button>
  </Flex>
);

export default Error;