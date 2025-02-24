
import { Flex } from '@/components/Flex';
import { WEEK } from '@/constants/date';
import { isSameDate } from '@/utils/date';

import type { DiscussionDTO } from '../../model';
import DiscussionCard from '../DiscussionCard';
import { dayStyle } from './index.css';

export const CalendarDate = (
  { date, groupMap, selected }: 
  { date: Date; groupMap: Map<string, DiscussionDTO[]>; selected: Date },
) => {
  const day = WEEK[date.getDay()];
  return (
    <Flex
      className={dayStyle({ selected: isSameDate(date, selected) })}
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
