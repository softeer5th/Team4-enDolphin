import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { formatDateToWeekRange, isAllday } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';
import { calcPositionByDate } from '@/utils/date/position';

import { usePersonalEventsQuery } from '../../api/queries';
import type { PersonalEventResponse } from '../../model';
import { CalendarCard } from '../CalendarCard';
import CalendarTable from './CalendarTable';
import { calendarStyle } from './index.css';

const AlldayCard = (card: PersonalEventResponse) => {
  const start = new Date(card.startDateTime);
  const end = new Date(card.endDateTime);
  const dayDiff = end.getDate() - start.getDate() + 1;
  const { x: sx } = calcPositionByDate(start);

  return (
    <CalendarCard
      calendarId={card.calendarId}
      endTime={end}
      id={card.id}
      key={card.id}
      size='md'
      startTime={start}
      status={card.isAdjustable ? 'adjustable' : 'fixed'}
      style={{
        width: `calc((100% - 72px - 1.25rem) / 7 * ${dayDiff})`,
        height: 57,
        position: 'absolute',
        left: `calc(((100% - 72px - 1.25rem) / 7 * ${sx}) + 72px)`,
        top: 136,
        zIndex: 2,
      }}
      title={card.title}
    />
  ); 
};

export const MyCalendar = () => {
  const calendar = useSharedCalendarContext();
  const { startDate, endDate } = formatDateToWeekRange(calendar.selectedDate);

  const { personalEvents, isLoading } = usePersonalEventsQuery({ 
    startDate: formatDateToBarString(startDate), 
    endDate: formatDateToBarString(endDate),
  });

  return (
    <Calendar {...calendar} className={calendarStyle}>
      <Calendar.Core />
      {
        !isLoading && 
        personalEvents?.filter((event) => isAllday(event.startDateTime, event.endDateTime))
          .map((event) => <AlldayCard key={event.id} {...event} />)
      }
      <Calendar.Header />
      {<CalendarTable personalEvents={isLoading ? [] : personalEvents} />}
    </Calendar>
  );
};