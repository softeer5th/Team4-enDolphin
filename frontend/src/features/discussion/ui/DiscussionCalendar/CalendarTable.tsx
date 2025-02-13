
import { useCalendarContext } from '@/components/Calendar/context/CalendarContext';
import { Flex } from '@/components/Flex';

import type { DiscussionResponse } from '../../model';

const data: DiscussionResponse = {
  events: [
    {
      startDateTime: new Date('2025-02-20'),
      endDateTime: new Date('2025-02-21'),
      usersForAdjust: [
        {
          id: 1,
          name: '이현영', 
        },
        {
          id: 2,
          name: '이재영',
        },
      ],
    },
    {
      startDateTime: new Date('2025-02-16'),
      endDateTime: new Date('2025-02-17'),
      usersForAdjust: [
        {
          id: 3,
          name: '김동권', 
        },
        {
          id: 4,
          name: '김동현',
        },
      ],
    },
  ],
};

export const CalendarTable = () => {
  const { selected, dates } = useCalendarContext();
  return (
    <Flex justify='space-between' width='100%'>
      {dates.map((date) => <div key={date.getTime()}>{date.toDateString()}</div>)}
    </Flex>
  );
};