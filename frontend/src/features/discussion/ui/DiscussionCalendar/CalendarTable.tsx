
import { useCalendarContext } from '@/components/Calendar/context/CalendarContext';
import { Flex } from '@/components/Flex';
import { WEEK } from '@/constants/date';

import type { DiscussionDTO } from '../../model';
import DiscussionCard from '../DiscussionCard';
import { calendarTableStyle, dayStyle } from './index.css';

const data: DiscussionDTO[] = [
  {
    startDateTime: new Date('2025-02-16'),
    endDateTime: new Date('2025-02-17'),
    usersForAdjust: [],
  },
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
];

const groupByDayOfWeek = (data: DiscussionDTO[]) => 
  data.reduce<Map<string, DiscussionDTO[]>>(
    (acc, item) => {
      const day = WEEK[item.startDateTime.getDay()];
      const dayData = acc.get(day);
      if (dayData) dayData.push(item);
      return acc;
    }, new Map(WEEK.map((day) => [day, [] as DiscussionDTO[]])),
  );

export const CalendarTable = () => {
  const { dates } = useCalendarContext();
  const groupMap = groupByDayOfWeek(data);

  return (
    <Flex
      className={calendarTableStyle}
      height='36.5rem'
      width='100%'
    >
      {dates.map((date) => {
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
                key={`${discussion.startDateTime.getTime()}-${idx}`}
                size='sm'
              />,
            )}
          </Flex>
        );
      },
      )}
    </Flex>
  );
};