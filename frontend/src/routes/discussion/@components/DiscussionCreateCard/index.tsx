import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { containerStyle } from './index.css';

const DiscussionCreateCard = () => (
  <Flex
    align='center'
    className={containerStyle}
    direction='column'
    gap={700}
  >
    <img src='/images/assets/calendar.webp' width={100} />
    <Text color={vars.color.Ref.Netural[900]} typo='h2'>일정 조율 생성 완료</Text>
    <Flex
      direction='column'
      gap={200}
      width='100%'
    >
      <Text color={vars.color.Ref.Primary[500]} typo='t3'>마감까지 15일</Text>
      <Text color={vars.color.Ref.Netural[800]} typo='h3'>기업디(3) 첫 팀플</Text>
      <Flex direction='column'>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>12월 30일 ~ 1월 5일</Text>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>강남역 4번 출구</Text>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>1시간</Text>
      </Flex>
    </Flex>
    <Flex justify='flex-end' width='100%'>
      <Button
        as={Link}
        size='xl'
        style='borderless'
        to='/'
      >
        홈으로
      </Button>
      <Button size='xl'>링크 공유</Button>
    </Flex>
  </Flex>
);

export default DiscussionCreateCard;