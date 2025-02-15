import { Badge } from '@/components/Badge';
import { Flex } from '@/components/Flex';
import { getHourDiff, getTimeRangeString } from '@/utils/date';

import type { DiscussionConfirmCardProps } from '.';
import { badgeContainerStyle } from './index.css';

interface BadgeContainerProps {
  meetingDateTimeRange: DiscussionConfirmCardProps['meetingDateTimeRange'];
  location?: DiscussionConfirmCardProps['location'];
}

const BadgeContainer = ({ 
  meetingDateTimeRange, 
  location,
}: BadgeContainerProps) => {
  const [timeStart, timeEnd] = [meetingDateTimeRange.start, meetingDateTimeRange.end];
  const timeRangeString = getTimeRangeString(timeStart, timeEnd);
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