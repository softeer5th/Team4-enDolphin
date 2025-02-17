import { Badge } from '@/components/Badge';
import { Flex } from '@/components/Flex';
import { getDateRangeString } from '@/utils/date';
import { formatTimeStringToLocaleString } from '@/utils/date/format';

import type { DiscussionResponse } from '../../model';

export const DiscussionBadges = ({ discussion }: { discussion?: DiscussionResponse }) => {
  if (!discussion) return null;
  const {
    dateRangeEnd,
    dateRangeStart,
    timeRangeStart,
    timeRangeEnd,
    location,
    duration,
  } = discussion;

  return (
    <Flex gap={250}>
      <Badge iconType='date'>
        {getDateRangeString(new Date(dateRangeStart), new Date(dateRangeEnd))}
      </Badge>
      <Badge iconType='date'>
        {formatTimeStringToLocaleString(timeRangeStart)}
        ~
        {formatTimeStringToLocaleString(timeRangeEnd)}
      </Badge>
      <Badge iconType='time'>
        {`${duration}분`}
      </Badge>
      {location && 
      <Badge iconType='location'>
        {location}
      </Badge>}
    </Flex>
  );
};