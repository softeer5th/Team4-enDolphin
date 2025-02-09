import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useSafeContext } from '@/hooks/useSafeContext';
import { vars } from '@/theme/index.css';
import { isSameDate, isSaturday, isSunday } from '@/utils/date';

import type { CalendarType } from '../..';
import { DatePickerContext } from '../context/DatePickerContext';
import type { HighlightState } from '../Highlight';
import { cellThemeVars } from '../index.css';
import CellWrapper from './CellWrapper';
import {
  holidayCellStyle,
  otherMonthCellStyle,
  saturdayCellStyle,
  selectedCellStyle,
  todayCellStyle,
  weekdayCellStyle,
} from './index.css';

export interface DateCellProps {
  date: Date;
  baseDate: Date;
  selected: boolean;
  highlightState: HighlightState;
}

type DateCellType = 'weekday' | 'saturday' | 'holiday' | 'otherMonth' | 'today' | 'selected';

export const DateCell = ({ 
  date,
  selected, 
  baseDate,
  highlightState, 
}: DateCellProps) => {
  const { calendarType, onDateCellSelect } = useSafeContext(DatePickerContext);
  const todayCellStyle = getTodayCellStyle(calendarType);
  const selectedCellStyle = getSelectedCellStyle(calendarType);
  const inlineCellStyles = assignInlineVars(cellThemeVars, {
    todayCellBackgroundColor: todayCellStyle.backgroundColor ?? 'transparent',
    todayCellColor: todayCellStyle.color ?? 'transparent',
    selectedCellBackgroundColor: selectedCellStyle.backgroundColor ?? 'transparent',
    selectedCellColor: selectedCellStyle.color ?? 'transparent',
  });

  const dateCellType = getDateCellType(date, calendarType, selected, baseDate, highlightState);

  // TODO: cell에 대한 cursor style과 컨트롤을 묶어서 처리할 방법 모색
  return (
    <CellWrapper 
      className={getDateCellStyle(dateCellType)}
      cursorType={calendarType === 'range' && dateCellType === 'otherMonth' 
        ? 'not-allowed' 
        : 'pointer'}
      onClick={() => onDateCellSelect(date)}
      style={inlineCellStyles}
    >
      {date.getDate()}
    </CellWrapper>
  );
};

const getDateCellType = (
  date: Date,
  calendarType: CalendarType,
  selected: boolean,
  baseDate: Date,
  highlightState: HighlightState,
): DateCellType => {
  if (selected) return 'selected';
  if (calendarType === 'range' && (
    highlightState === 'startOfRange' || highlightState === 'endOfRange'
  )) {
    return 'selected';
  }

  if (calendarType === 'select' && isSameDate(date, new Date())) return 'today';
  if (date.getMonth() !== baseDate.getMonth()) return 'otherMonth';
  // TODO: 공휴일도 함께 체크
  if (isSunday(date)) return 'holiday';
  if (isSaturday(date)) return 'saturday';
  return 'weekday';
};

const getDateCellStyle = (
  dateCellType: DateCellType,
) => {
  switch (dateCellType) {
    case 'selected':
      return selectedCellStyle;
    case 'today':
      return todayCellStyle;
    case 'otherMonth':
      return otherMonthCellStyle;
    case 'holiday':
      return holidayCellStyle;
    case 'saturday':
      return saturdayCellStyle;
    case 'weekday':
    default:
      return weekdayCellStyle;
  }
};

const getTodayCellStyle = (calendarType: CalendarType) => calendarType === 'select'
  ? { backgroundColor: vars.color.Ref.Primary[500], color: vars.color.Ref.Netural['White'] }
  : { };

const getSelectedCellStyle = (calendarType: CalendarType) => calendarType === 'select'
  ? { backgroundColor: vars.color.Ref.Primary[100], color: vars.color.Ref.Primary[500] }
  : { backgroundColor: vars.color.Ref.Primary[500], color: vars.color.Ref.Netural['White'] };