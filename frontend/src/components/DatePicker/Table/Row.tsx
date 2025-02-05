import type { HighlightRange } from '@/hooks/useMonthCalendar/useHighlightRange';
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';
import { intersperseElement } from '@/utils/jsxUtils';

import { MonthCalendarContext } from '../MonthCalendarContext';
import { DateCell } from './Cell';
import type { HighlightState } from './Highlight';
import HighlightBox from './Highlight/HighlightBox';
import HighlightGap from './Highlight/HighlightGap';
import RowContainer from './RowContainer';

interface RowProps {
  week: Date[];
  baseDate: Date;
  selectedDate: Date | null;
}

const Row = ({ week, baseDate, selectedDate }: RowProps) => {
  const { highlightRange } = useSafeContext(MonthCalendarContext);
  const rawRow = week.map((day, index) => (
    <HighlightBox highlightState={getHighlightState(day, highlightRange)} key={day.getTime()}>
      <DateCell 
        currentMonth={baseDate.getMonth()}
        date={day}
        key={index}
        selected={selectedDate ? isSameDate(day, selectedDate) : false}
      />
    </HighlightBox>
  ));
  const preparedRow = intersperseElement(rawRow, <HighlightGap />);

  return (
    <RowContainer>
      {preparedRow}
    </RowContainer>
  );
};

const getHighlightState = (date: Date, highlightRange: HighlightRange): HighlightState => {
  const { start, end } = highlightRange;
  if (!start || !end) return 'none';
  
  if (isSameDate(date, start)) return 'startOfRange';
  if (isSameDate(date, end)) return 'EndOfRange';
  if (date > start && date < end) return 'InRange';
  return 'none';
};

export default Row;