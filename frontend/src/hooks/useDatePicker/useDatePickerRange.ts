
import type { HighlightRange } from '@/components/DatePicker/Table/Highlight';
import { isSameDate } from '@/utils/date';

interface UseDatePickerRangeProps {
  highlightRange: HighlightRange;
  setHighlightStart: (date: Date | null) => void;
  setHighlightEnd: (date: Date | null) => void;
}

export const useDatePickerRange = ({
  highlightRange,
  setHighlightStart,
  setHighlightEnd,
}: UseDatePickerRangeProps) => {
  const onDateCellClick = (date: Date) => {
    const { start, end } = highlightRange;
    if (!start) {
      setHighlightStart(date);
      return;
    }
    if (!end) {
      if (date < start) setHighlightStart(date);
      else setHighlightEnd(date);
      return;
    }

    setHighlightStart(null);
    setHighlightEnd(null);
  };
  return { onDateCellClick };
};
