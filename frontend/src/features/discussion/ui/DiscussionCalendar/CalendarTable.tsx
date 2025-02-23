
import { useParams } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

import { useCalendarContext } from '@/components/Calendar/context/CalendarContext';
import { Flex } from '@/components/Flex';
import { WEEK } from '@/constants/date';
import { checkboxAtom } from '@/store/discussion';
import { formatDateToWeekRange } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';

import { useDiscussionCalendarQuery } from '../../api/queries';
import type { DiscussionDTO } from '../../model';
import { CalendarDate } from './CalendarDate';
import { calendarTableStyle } from './index.css';

const groupByDayOfWeek = (data: DiscussionDTO[]) => 
  data.reduce<Map<string, DiscussionDTO[]>>(
    (acc, item) => {
      const day = WEEK[new Date(item.startDateTime).getDay()];
      const dayData = acc.get(day);
      if (dayData) dayData.push(item);
      return acc;
    }, new Map(WEEK.map((day) => [day, [] as DiscussionDTO[]])),
  );

export const CalendarTable = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const checkedList = useAtomValue(checkboxAtom);
  const { dates, selected } = useCalendarContext();
  const { startDate, endDate } = formatDateToWeekRange(selected);
  const { calendar } = useDiscussionCalendarQuery(params.id, {
    startDate: formatDateToBarString(startDate),
    endDate: formatDateToBarString(endDate),
    selectedUserIdList: checkedList ?? undefined,
  });

  return (
    <Flex
      className={calendarTableStyle}
      height='calc(100vh - (134px * 2) - (56px * 2) - 34px)'
      width='100%'
    >
      {dates.map((date) => 
        <CalendarDate
          date={date}
          groupMap={groupByDayOfWeek(calendar || [])}
          key={date.getTime()}
          selected={selected}
        />,
      )}
    </Flex>
  );
};