import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Pencil } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { titleStyle } from './index.css';

const DiscussionTitle = () => (
  <Flex
    align='center'
    className={titleStyle}
    justify='space-between'
    width='100%'
  >
    <Text color={vars.color.Ref.Netural[900]} typo='h2'>schedule_name 일정 조율 결과</Text>
    <Button
      rightIcon={<Pencil clickable />}
      size='lg'
      style='weak'
      variant='secondary'
    >
      수정하기
    </Button>
  </Flex>
);

export default DiscussionTitle;