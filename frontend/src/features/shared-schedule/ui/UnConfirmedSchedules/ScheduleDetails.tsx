import Button from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { 
  containerStyle,
  recommendContainerStyle,
  recommendItemStyle, 
  subTextContainerStyle, 
} from './ScheduleDetails.css';

// interface ScheduleDetailsProps {
//   schedule: object;
// }

const ScheduleContents = () => (
  <Flex
    className={containerStyle}
    direction='column'
    gap={800}
    justify='flex-start'
  >
    <ScheduleInfo />
    <RecommendedSchedules />
    <Flex
      gap={200}
      justify='flex-end'
      width='full'
    >
      <Button size='xl' style='borderless'>링크 복사 </Button>
      <Button size='xl'>자세히 보기</Button>
    </Flex>
  </Flex>
);

const ScheduleInfo = () => (
  <Flex
    direction='column'
    gap={200}
    justify='flex-start'
    width='full'
  >
    <Text color={vars.color.Ref.Red[500]} typo='b3M'>마감까지 15일</Text>
    <Text typo='h3'>기업디(3) 첫 팀플</Text>
    <Flex
      className={subTextContainerStyle}
      direction='column'
      gap={200}
    >
      <Text color={vars.color.Ref.Netural[600]} typo='b2R'>12월 30일 ~ 1월 5일</Text>
      <Text color={vars.color.Ref.Netural[600]} typo='b2R'>강남역 4번 출구</Text>
      <Text color={vars.color.Ref.Netural[600]} typo='b2R'>1시간</Text>
    </Flex>
  </Flex>
);

const RecommendedSchedules = () => (
  <Flex direction='column' width='full'>
    <Text className={recommendContainerStyle} typo='t2'>추천 일정</Text>
    <RecommendedScheduleItem />
    <RecommendedScheduleItem />
    <RecommendedScheduleItem />
  </Flex>
);

const RecommendedScheduleItem = () => (
  <Flex
    align='center'
    className={recommendItemStyle}
    justify='space-between'
    width='full'
  >
    <Flex direction='column' gap={100}>
      <Text typo='b2M'>12월 11일 목요일</Text>
      <Text color={vars.color.Ref.Netural[700]} typo='b3R'>오전 11시 ~ 오후 2시 (3시간)</Text>
    </Flex >
    <Chip
      color='blue'
      radius='max'
      size='md'
      style='weak'
    >
      모두 가능
    </Chip>
  </Flex>
);

export default ScheduleContents;