import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useSafeContext } from '@/hooks/useSafeContext';

import { DatePickerContext } from '../../DatePickerContext';
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

interface DateCellProps {
  selected: boolean;
  today: boolean;
  otherMonth: boolean;
  saturday: boolean;
  holiday: boolean;
  children: string;
}

const DateCell = ({ children, ...props }: DateCellProps) => {
  const { todayCellStyle, selectedCellStyle } = useSafeContext(DatePickerContext);
  const inlineCellStyles = assignInlineVars(cellThemeVars, {
    todayCellBackgroundColor: todayCellStyle.backgroundColor ?? 'transparent',
    todayCellColor: todayCellStyle.color ?? 'transparent',
    selectedCellBackgroundColor: selectedCellStyle.backgroundColor ?? 'transparent',
    selectedCellColor: selectedCellStyle.color ?? 'transparent',
  });

  return (
    <CellWrapper className={getDateCellStyle(props)} style={inlineCellStyles}>
      {children}
    </CellWrapper>
  );
};

const getDateCellStyle = ({ 
  selected, 
  today,
  otherMonth, 
  saturday, 
  holiday, 
}: Omit<DateCellProps, 'children'>) => {
  if (selected) return selectedCellStyle;
  if (today) return todayCellStyle;
  if (otherMonth) return otherMonthCellStyle;
  if (holiday) return holidayCellStyle;
  if (saturday) return saturdayCellStyle;
  return weekdayCellStyle;
};

export default DateCell;