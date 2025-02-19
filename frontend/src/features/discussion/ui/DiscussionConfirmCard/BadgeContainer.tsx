import { Badge } from '@/components/Badge';
import { Flex } from '@/components/Flex';
import { getMinuteDiff, getTimeRangeString } from '@/utils/date';
import { formatDateToString } from '@/utils/date/format';

import { badgeContainerStyle } from './index.css';

const BadgeContainer = (
  { startDateTime, endDateTime, location }: 
  {
    startDateTime: Date; 
    endDateTime: Date; 
    location: string;
  }) => 
  (
    <Flex
      align='center'
      className={badgeContainerStyle}
      gap={250}
      justify='flex-start'
    >
      <Badge iconType='date'>
        {formatDateToString(startDateTime)}
      </Badge>
      <Badge iconType='date'>
        {getTimeRangeString(startDateTime, endDateTime)}
      </Badge>
      <Badge iconType='time'>
        {getMinuteDiff(startDateTime, endDateTime)}
        분
      </Badge>
      {location && <Badge iconType='location'>{location}</Badge>}
    </Flex>
  );

export default BadgeContainer;