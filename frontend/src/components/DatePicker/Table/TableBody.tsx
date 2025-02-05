
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';

import { MonthCalendarContext } from '../DatePickerContext';
import { DateCell } from './Cell';
import RowContainer from './RowContainer';

const TableBody = () => {
  const { calendarDates, selectedDate, currentDate } = useSafeContext(MonthCalendarContext);
  return (
    <div>
      {calendarDates.map((week, index) => (
        <RowContainer key={index}>
          {week.map((day, index) => (
            <DateCell 
              currentMonth={currentDate.getMonth()}
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