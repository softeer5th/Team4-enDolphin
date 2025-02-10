import { createContext } from 'react';

import type { CommonDatePickerProps, DatePickerType, HighlightRange  } from '..';

export interface DatePickerContextProps extends CommonDatePickerProps {
  calendarType: DatePickerType;
  calendarDates: Date[][];
  selectedDate: Date | null;
  highlightRange: HighlightRange;
  onDateCellClick: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
}

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);
