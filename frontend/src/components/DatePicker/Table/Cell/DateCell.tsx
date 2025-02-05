import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useDateSelect } from '@/hooks/useDatePicker/useDateSelect';
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate, isSaturday, isSunday } from '@/utils/date';

import type { CalendarType } from '../..';
import { DatePickerContext } from '../../DatePickerContext';
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

export const DateCell = ({ date, selected, baseDate, highlightState }: DateCellProps) => {
  const { 
    calendarType,
    todayCellStyle,
    selectedCellStyle,
  } = useSafeContext(DatePickerContext);
  const inlineCellStyles = assignInlineVars(cellThemeVars, {
    todayCellBackgroundColor: todayCellStyle.backgroundColor ?? 'transparent',
    todayCellColor: todayCellStyle.color ?? 'transparent',
    selectedCellBackgroundColor: selectedCellStyle.backgroundColor ?? 'transparent',
    selectedCellColor: selectedCellStyle.color ?? 'transparent',
  });

  return (
    <CellWrapper 
      className={getDateCellStyle(date, calendarType, selected, baseDate, highlightState)} 
      onClick={useDateSelect(date)}
      style={inlineCellStyles}
    >
      {date.getDate()}
    </CellWrapper>
  );
};

const getDateCellStyle = (
  date: Date,
  calendarType: CalendarType,
  selected: boolean,
  baseDate: Date,
  highlightState: HighlightState,
) => {
  if (selected) return selectedCellStyle;
  if (calendarType === 'range' && (
    highlightState === 'startOfRange' || highlightState === 'EndOfRange'
  )) {
    return selectedCellStyle;
  }

  if (calendarType === 'select' && isSameDate(date, new Date())) return todayCellStyle;
  if (date.getMonth() !== baseDate.getMonth()) return otherMonthCellStyle;
  // TODO: 공휴일도 함께 체크
  if (isSunday(date)) return holidayCellStyle;
  if (isSaturday(date)) return saturdayCellStyle;
  return weekdayCellStyle;
};
