import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useDiscussionQuery } from '@/features/discussion/api/queries';
import type { DiscussionResponse } from '@/features/discussion/model';
import { vars } from '@/theme/index.css';

import RecommendedSchedules from './RecommendedSchedules';
import {
  containerStyle,
  subTextContainerStyle,
} from './ScheduleDetails.css';

interface ScheduleDetailsProps {
  discussionId: number;
}

// TODO: Date 타입 변환 후 변경사항 적용
const ScheduleContents = ({ discussionId }: ScheduleDetailsProps) => {
  const { discussion, isLoading } = useDiscussionQuery(discussionId.toString());
  if (isLoading) return <div>pending ...</div>;
  if (!discussion) return <div>No data available</div>;

  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={800}
      justify='flex-start'
    >
      <ScheduleInfo discussion={discussion} />
      <RecommendedSchedules />
      <Flex
        gap={200}
        justify='flex-end'
        width='full'
      >
        <Button size='xl' style='borderless'>링크 복사</Button>
        <Button size='xl'>자세히 보기</Button>
      </Flex>
    </Flex>
  ); 
};

const ScheduleInfo = ({ discussion }: {
  discussion: DiscussionResponse;
}) => {
  const { title, location, duration } = discussion;
  return (
    <Flex
      direction='column'
      gap={200}
      justify='flex-start'
      width='full'
    >
      <Text color={vars.color.Ref.Red[500]} typo='b3M'>
        {/* {`마감까지 ${getDday(dateRangeEnd)}일`} */}
      </Text>
      <Text typo='h3'>{title}</Text>
      <Flex
        className={subTextContainerStyle}
        direction='column'
        gap={200}
      >
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {/* {getDateRangeString(dateRangeStart, dateRangeEnd)} */}
        </Text>
        {location && <Text color={vars.color.Ref.Netural[600]} typo='b2R'>{location}</Text>}
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>{duration}</Text>
      </Flex>
    </Flex>
  );
};

export default ScheduleContents;