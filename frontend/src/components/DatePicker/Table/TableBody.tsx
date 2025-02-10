
import { useSafeContext } from '@/hooks/useSafeContext';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

import { DatePickerContext } from '../context/DatePickerContext';
import Row from './Row';

const TableBody = () => {
  const { baseDate } = useSafeContext(DatePickerContext);
  const calendarDates = generateMonthCalendar(baseDate ?? new Date());
  return (
    calendarDates.map((week) => (
      <Row
        key={`week-${week[0].toISOString()}`}
        weekDates={week}
      />
    ))
  );
};

export default TableBody;
