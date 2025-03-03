import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { formatDateToWeekRange, isAllday } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';
import { calcSizeByDate } from '@/utils/date/position';

import { usePersonalEventsQuery } from '../../api/queries';
import type { PersonalEventResponse } from '../../model';
import { CalendarCard } from '../CalendarCard';
import CalendarTable from './CalendarTable';
import { calendarStyle } from './index.css';

const AlldayCard = (card: PersonalEventResponse) => {
  const { selectedWeek } = useSharedCalendarContext();
  const start = new Date(card.startDateTime);
  const end = new Date(card.endDateTime);

  const sizePosition = calcSizeByDate({ start, end }, selectedWeek);

  if (!sizePosition) return null;
  const { x, width } = sizePosition;

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
        width: `calc((100% - 72px - 1.25rem) / 7 * ${width})`,
        height: 57,
        position: 'absolute',
        left: `calc(((100% - 72px - 1.25rem) / 7 * ${x}) + 72px)`,
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

  const { personalEvents, isPending } = usePersonalEventsQuery({ 
    startDate: formatDateToBarString(startDate), 
    endDate: formatDateToBarString(endDate),
  });

  return (
    <Calendar {...calendar} className={calendarStyle}>
      <Calendar.Core />
      {
        !isPending && 
        personalEvents?.filter((event) => isAllday(event.startDateTime, event.endDateTime))
          .map((event) => <AlldayCard key={event.id} {...event} />)
      }
      <Calendar.Header />
      {<CalendarTable personalEvents={isPending ? [] : personalEvents} />}
    </Calendar>
  );
};