import { Badge } from '@/components/Badge';
import { Flex } from '@/components/Flex';
import { getHourDiff, getTimeRangeString, parseTime } from '@/utils/date';

import type { DiscussionConfirmCardProps } from '.';
import { badgeContainerStyle } from './index.css';

interface BadgeContainerProps {
  meetingDateTimeRange: DiscussionConfirmCardProps['meetingDateTimeRange'];
  location?: DiscussionConfirmCardProps['location'];
}

// Date, Time 일관성 있게 관리할 방법 찾아보기
// zod에서 Time 객체같은 거 안 주나..
const BadgeContainer = ({ 
  meetingDateTimeRange, 
  location,
}: BadgeContainerProps) => {
  const [timeStart, timeEnd] = [meetingDateTimeRange.start, meetingDateTimeRange.end];
  const [startTime, endTime] = [
    parseTime(timeStart.toTimeString()),
    parseTime(timeEnd.toTimeString()),
  ];
  const timeRangeString = getTimeRangeString(startTime, endTime);
  return (
    <Flex
      align='center'
      className={badgeContainerStyle}
      gap={250}
      justify='flex-start'
    >
      <Badge iconType='date'>{`${timeRangeString} (${getHourDiff(timeStart, timeEnd)}시간)`}</Badge>
      {location && <Badge iconType='location'>{location}</Badge>}
    </Flex>
  );
};

export default BadgeContainer;