import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { PropsWithChildren } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

import CellWrapper from '../CellWrapper';
import { DatePickerContext } from '../DatePickerContext';
import { 
  cellThemeVars,
  holidayCellStyle,
  otherMonthCellStyle,
  saturdayCellStyle,
  selectedCellStyle,
  todayCellStyle,
  weekdayCellStyle, 
} from './index.css';

interface DateCellProps extends PropsWithChildren {
  selected: boolean;
  today: boolean;
  otherMonth: boolean;
  saturday: boolean;
  holiday: boolean;
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
}: DateCellProps) => {
  if (selected) return selectedCellStyle;
  if (today) return todayCellStyle;
  if (otherMonth) return otherMonthCellStyle;
  if (holiday) return holidayCellStyle;
  if (saturday) return saturdayCellStyle;
  return weekdayCellStyle;
};

export default DateCell;