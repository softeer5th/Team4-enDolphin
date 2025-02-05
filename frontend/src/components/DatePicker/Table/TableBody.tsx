
import { useSafeContext } from '@/hooks/useSafeContext';

import { MonthCalendarContext } from '../MonthCalendarContext';
import Row from './Row';

const TableBody = () => {
  const { calendarDates, selectedDate, baseDate } = useSafeContext(MonthCalendarContext);
  return (
    <div>
      {calendarDates.map((week, index) => (
        <Row
          baseDate={baseDate}
          key={index}
          selectedDate={selectedDate}
          week={week}
        />
      ))}
    </div>
  );
};

export default TableBody;