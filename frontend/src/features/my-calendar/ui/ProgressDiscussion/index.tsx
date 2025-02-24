import { Flex } from '@/components/Flex';
import { Progress } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { titleContainerStyle } from './index.css';

export const ProgressDiscussion = () => (
  <Flex
    direction='column'
    gap={250}
    width='100%'
  >
    <Flex
      align='center'
      className={titleContainerStyle}
      gap={100}
      justify='flex-start'
      width='100%'
    >
      <Progress />
      <Text color={vars.color.Ref.Primary[500]} typo='b3M'>조율 중인 일정</Text>
    </Flex>
  </Flex>
);