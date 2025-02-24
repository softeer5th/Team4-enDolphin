
import { Flex } from '@/components/Flex';
import { useSafeContext } from '@/hooks/useSafeContext';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

import { DatePickerContext } from '../context/DatePickerContext';
import Row from './Row';

const TableBody = () => {
  const { baseDate } = useSafeContext(DatePickerContext);
  const calendarDates = generateMonthCalendar(baseDate ?? new Date());
  return (
    <Flex
      direction='column'
      gap={100}
      width='full'
    >
      {calendarDates.map((week) => (
        <Row
          key={`week-${week[0].toISOString()}`}
          weekDates={week}
        />
      ))}
    </Flex>
  );
};

export default TableBody;
