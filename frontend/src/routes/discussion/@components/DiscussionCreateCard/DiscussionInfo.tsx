import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { textStyle } from './index.css';

const DiscussionInfo = () => (
  <Flex
    direction='column'
    gap={200}
    width='100%'
  >
    <Text color={vars.color.Ref.Primary[500]} typo='t3'>마감까지 15일</Text>
    <Text color={vars.color.Ref.Netural[800]} typo='h3'>기업디(3) 첫 팀플</Text>
    <Flex className={textStyle} direction='column'>
      <Text typo='b2R'>12월 30일 ~ 1월 5일</Text>
      <Text typo='b2R'>강남역 4번 출구</Text>
      <Text typo='b2R'>1시간</Text>
    </Flex>
  </Flex>
);

export default DiscussionInfo;