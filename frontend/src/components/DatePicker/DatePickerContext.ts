import { createContext } from 'react';

import type { UseMonthCalendarReturn } from '@/hooks/useDatePicker';

import type { CellStyleProps, DatePickerProps } from '.';

interface DatePickerContextProps extends UseMonthCalendarReturn, DatePickerProps {
  todayCellStyle: CellStyleProps;
  selectedCellStyle: CellStyleProps;
}

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);