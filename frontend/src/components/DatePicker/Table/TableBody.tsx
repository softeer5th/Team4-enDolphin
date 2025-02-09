
import { useSafeContext } from '@/hooks/useSafeContext';

import { DatePickerContext } from '../context/DatePickerContext';
import Row from './Row';

const TableBody = () => {
  const { calendarDates, baseDate } = useSafeContext(DatePickerContext);
  return (
    calendarDates.map((week) => (
      <Row
        baseDate={baseDate}
        key={`week-${week[0].toISOString()}`}
        weekDates={week}
      />
    ))
  );
};

export default TableBody;
