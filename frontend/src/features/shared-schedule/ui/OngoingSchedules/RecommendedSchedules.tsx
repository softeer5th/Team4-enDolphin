import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { recommendContainerStyle, recommendItemStyle } from './recommendedSchedules.css';

// interface RecommendedSchedulesProps {
//   discussionId: number;
// }

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

export default RecommendedSchedules;