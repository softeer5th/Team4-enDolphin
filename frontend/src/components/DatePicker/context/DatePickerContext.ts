import { createContext } from 'react';

import type { CommonDatePickerProps, DatePickerType  } from '..';
import type { HighlightRange } from '../Table/Highlight';

export interface DatePickerContextProps extends CommonDatePickerProps {
  calendarType: DatePickerType;
  selectedDate: Date | null;
  highlightRange: HighlightRange;
  onDateCellClick: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
}

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);
