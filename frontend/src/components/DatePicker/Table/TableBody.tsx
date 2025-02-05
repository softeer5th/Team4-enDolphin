
import { useSafeContext } from '@/hooks/useSafeContext';

import { DatePickerContext } from '../DatePickerContext';
import Row from './Row';

const TableBody = () => {
  const { calendarDates, selectedDate, baseDate } = useSafeContext(DatePickerContext);
  return (
    calendarDates.map((week, index) => (
      <Row
        baseDate={baseDate}
        key={index}
        selectedDate={selectedDate}
        week={week}
      />
    ))
  );
};

export default TableBody;