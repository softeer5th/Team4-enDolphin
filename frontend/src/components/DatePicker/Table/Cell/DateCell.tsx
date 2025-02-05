import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { PropsWithChildren } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import { isHoliday, isSameDate, isSaturday, isSunday } from '@/utils/date';

import { MonthCalendarContext } from '../../DatePickerContext';
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

export interface DateCellProps extends PropsWithChildren {
  date: Date;
  selected: boolean;
  currentMonth: number;
}

export const DateCell = ({ children, date, selected, currentMonth }: DateCellProps) => {
  const { todayCellStyle, selectedCellStyle } = useSafeContext(MonthCalendarContext);
  const inlineCellStyles = assignInlineVars(cellThemeVars, {
    todayCellBackgroundColor: todayCellStyle.backgroundColor ?? 'transparent',
    todayCellColor: todayCellStyle.color ?? 'transparent',
    selectedCellBackgroundColor: selectedCellStyle.backgroundColor ?? 'transparent',
    selectedCellColor: selectedCellStyle.color ?? 'transparent',
  });

  return (
    <CellWrapper 
      className={getDateCellStyle(date, selected, currentMonth )} 
      style={inlineCellStyles}
    >
      {date.getDate()}
    </CellWrapper>
  );
};

const getDateCellStyle = (date: Date, selected: boolean, currentMonth: number) => {
  if (selected) return selectedCellStyle;
  if (isSameDate(date, new Date())) return todayCellStyle;
  if (date.getMonth() !== currentMonth ) return otherMonthCellStyle;
  if (isSunday(date) || isHoliday(date)) return holidayCellStyle;
  if (isSaturday(date)) return saturdayCellStyle;
  return weekdayCellStyle;
};
