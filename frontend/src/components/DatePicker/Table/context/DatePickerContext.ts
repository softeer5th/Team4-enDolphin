import { createContext } from 'react';

import type { HighlightRange } from '@/hooks/useDatePicker/useHighlightRange';

import type { CalendarType, CommonDatePickerProps } from '../..';

interface DatePickerContextProps extends CommonDatePickerProps {
  calendarType: CalendarType;
  calendarDates: Date[][];
  selectedDate: Date | null;
  highlightRange: HighlightRange;
  onDateCellSelect: (date: Date | null) => void;
}

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);
