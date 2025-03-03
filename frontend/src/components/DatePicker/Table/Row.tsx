import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';

import { DatePickerContext } from '../context/DatePickerContext';
import { DateCell } from './Cell';
import type { HighlightRange, HighlightState } from './Highlight';
import HighlightBox from './Highlight/HighlightBox';
import HighlightGap from './Highlight/HighlightGap';
import RowContainer from './RowContainer';

interface RowProps {
  weekDates: Date[];
}

const Row = ({ weekDates }: RowProps) => {
  const { baseDate, highlightRange, isDateSelected } = useSafeContext(DatePickerContext);

  return (
    <RowContainer>
      {weekDates.map((day, index) => {
        const highlightState = getHighlightState(day, highlightRange);
        const cell = (
          <HighlightBox highlightState={highlightState} key={`cell-${day.getTime()}`}>
            <DateCell
              baseDate={baseDate}
              date={day}
              highlightState={highlightState}
              selected={isDateSelected(day)}
            />
          </HighlightBox>
        );
        // 마지막 셀 뒤에는 gap을 넣지 않음
        if (index === weekDates.length - 1) return cell;
        const gap = (
          <HighlightGap
            highlightState={getHighlightGapState(highlightState)} 
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

  if (isSameDate(start, end) && isSameDate(date, start)) return 'startAndEnd';
  if (isSameDate(date, start)) return 'startOfRange';
  if (isSameDate(date, end)) return 'endOfRange';
  if (date > start && date < end) return 'inRange';
  return 'none';
};

export default Row;

const getHighlightGapState = (highlightState: HighlightState): HighlightState => {
  if (highlightState === 'startOfRange' || highlightState === 'inRange') {
    return 'inRange';
  }
  return 'none';
};
