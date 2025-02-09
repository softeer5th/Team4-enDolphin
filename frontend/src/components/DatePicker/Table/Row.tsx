import type { HighlightRange } from '@/hooks/useDatePicker/useHighlightRange';
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';

import { DateCell } from './Cell';
import { DatePickerContext } from './context/DatePickerContext';
import type { HighlightState } from './Highlight';
import HighlightBox from './Highlight/HighlightBox';
import HighlightGap from './Highlight/HighlightGap';
import RowContainer from './RowContainer';

interface RowProps {
  weekDates: Date[];
  baseDate: Date;
}

const Row = ({ weekDates: week, baseDate }: RowProps) => {
  const { highlightRange, selectedDate } = useSafeContext(DatePickerContext);

  return (
    <RowContainer>
      {week.map((day, index) => {
        const highlightState = getHighlightState(day, highlightRange);
        const cell = (
          <HighlightBox highlightState={highlightState} key={`cell-${day.getTime()}`}>
            <DateCell
              baseDate={baseDate}
              date={day}
              highlightState={highlightState}
              selected={selectedDate ? isSameDate(day, selectedDate) : false}
            />
          </HighlightBox>
        );
        // 마지막 셀 뒤에는 gap을 넣지 않음
        if (index === week.length - 1) return cell;
        const gap = (
          <HighlightGap 
            highlightState={getGapHighlightState(highlightState)} 
            key={`gap-${day.getTime()}`}
          />
        );
        return [cell, gap];
      })}
    </RowContainer>
  );
};

const getHighlightState = (date: Date, highlightRange: HighlightRange): HighlightState => {
  const { start, end } = highlightRange;
  if (!start || !end) return 'none';
  
  if (isSameDate(date, start)) return 'startOfRange';
  if (isSameDate(date, end)) return 'endOfRange';
  if (date > start && date < end) return 'inRange';
  return 'none';
};

export default Row;

const getGapHighlightState = (highlightState: HighlightState): HighlightState => {
  if (highlightState === 'startOfRange' || highlightState === 'inRange') {
    return 'inRange';
  }
  return 'none';
};