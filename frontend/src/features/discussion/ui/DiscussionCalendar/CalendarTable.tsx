
import { useCalendarContext } from '@/components/Calendar/context/CalendarContext';
import { Flex } from '@/components/Flex';

import type { DiscussionDTO } from '../../model';
import DiscussionCard from '../DiscussionCard';
import { calendarTableStyle, dayStyle } from './index.css';

const data: DiscussionDTO[] = [
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
  {
    startDateTime: new Date('2025-02-16'),
    endDateTime: new Date('2025-02-17'),
    usersForAdjust: [],
  },
];

export const CalendarTable = () => {
  const { selected, dates } = useCalendarContext();
  return (
    <Flex
      className={calendarTableStyle}
      height='36.5rem'
      width='100%'
    >
      {dates.map((date) => 
        <Flex
          className={dayStyle}
          direction='column'
          gap={400}
          justify='flex-start'
          key={date.getTime()}
        >
          <DiscussionCard discussion={data[0]} />
        </Flex>,
      )}
    </Flex>
  );
};