import { Badge } from '@/components/Badge';
import { Flex } from '@/components/Flex';
import { getDateRangeString, getTimeRangeString } from '@/utils/date';

import type { DiscussionInviteCardProps } from '.';
import { badgeContainerStyle } from './index.css';

const Badges = ({ 
  dateRange, 
  timeRange,
  meetingDuration,
  location,
}: Pick<DiscussionInviteCardProps, 'dateRange' | 'timeRange' | 'meetingDuration' | 'location'>) => (
  <Flex
    align='center'
    className={badgeContainerStyle}
    gap={250}
    justify='flex-start'
  >
    <Badge iconType='date'>{getDateRangeString(dateRange.start, dateRange.end)}</Badge>
    <Badge iconType='date'>{getTimeRangeString(timeRange.start, timeRange.end)}</Badge>
    {/* 분 단위 포맷 구현 (~시간 ~분으로) */}
    <Badge iconType='time'>{`${meetingDuration}분`}</Badge>
    {location && <Badge iconType='location'>{location}</Badge>}
  </Flex>
);

export default Badges;