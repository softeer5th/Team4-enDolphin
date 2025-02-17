import { Flex } from '@/components/Flex';
import { WEEK } from '@/constants/date';

import type { DiscussionDTO } from '../../model';
import DiscussionCard from '../DiscussionCard';
import { dayStyle } from './index.css';

export const CalendarDate = (
  { date, groupMap }: { date: Date; groupMap: Map<string, DiscussionDTO[]> },
) => {
  const day = WEEK[date.getDay()];
  return (
    <Flex
      className={dayStyle}
      direction='column'
      gap={400}
      height='100%'
      justify='flex-start'
      key={date.getTime()}
      width='calc(100% / 7)'
    >
      {groupMap.get(day)?.map((discussion, idx) =>
        <DiscussionCard
          discussion={discussion}
          key={`${discussion.startDateTime}-${idx}`}
          size='sm'
        />,
      )}
    </Flex>
  );
};
