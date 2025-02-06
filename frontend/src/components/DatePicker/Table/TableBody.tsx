
import { useSafeContext } from '@/hooks/useSafeContext';

import { DatePickerContext } from '../DatePickerContext';
import Row from './Row';

const TableBody = () => {
  const { calendarDates, selectedDate, baseDate } = useSafeContext(DatePickerContext);
  return (
    calendarDates.map((week) => (
      <Row
        baseDate={baseDate}
        key={`week-${week[0].toISOString()}`}
        selectedDate={selectedDate}
        week={week}
      />
    ))
  );
};

export default TableBody;