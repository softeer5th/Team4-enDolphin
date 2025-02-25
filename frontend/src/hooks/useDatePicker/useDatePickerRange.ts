import type { HighlightRange } from '@/components/DatePicker/Table/Highlight';

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
    const timeTrimmedDate = trimTime(date);
    const { start, end } = highlightRange;
    // TODO: new Date(BAR_STYLE_DATE) 를 하면 BAR_STYLE_DATE를 UTC로 인식하여 +9시간이 되어버리는데, 이를 임시로 조치해 놓았음.
    // 커스텀 DATE 객체 추가 후 리팩터링 필요
    const [dateStart, dateEnd] = [
      start ? trimTime(start) : null,
      end ? trimTime(end) : null,
    ];
    if (!dateStart) {
      setHighlightStart(timeTrimmedDate);
      return;
    }
    if (!dateEnd) {
      if (timeTrimmedDate < dateStart) setHighlightStart(timeTrimmedDate);
      else setHighlightEnd(timeTrimmedDate);
      return;
    }
    if (dateStart > timeTrimmedDate) {
      setHighlightStart(timeTrimmedDate);
      return;
    }
    if (dateEnd < timeTrimmedDate) {
      setHighlightEnd(timeTrimmedDate);
      return;
    }
    setHighlightStart(null);
    setHighlightEnd(null);
  };
  return { onDateCellClick };
};

const trimTime = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};