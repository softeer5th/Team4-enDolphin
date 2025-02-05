
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';

import { MonthCalendarContext } from '../DatePickerContext';
import { DateCell } from './Cell';
import RowContainer from './RowContainer';

const TableBody = () => {
  const { daysInMonth, selectedDate, currentMonth } = useSafeContext(MonthCalendarContext);
  return (
    <div>
      {daysInMonth.map((week, index) => (
        <RowContainer key={index}>
          {week.map((day, index) => (
            <DateCell 
              currentMonth={currentMonth}
              date={day}
              key={index}
              selected={selectedDate ? isSameDate(day, selectedDate) : false}
            />
          ))}
        </RowContainer>
      ))}
    </div>
  );
};

export default TableBody;