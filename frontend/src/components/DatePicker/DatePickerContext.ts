import { createContext } from 'react';

import type { UseMonthCalendarReturn } from '@/hooks/useMonthCalendar';

import type { DatePickerProps } from '.';

interface DatePickerContextProps extends UseMonthCalendarReturn, DatePickerProps {}

export const MonthCalendarContext = createContext<DatePickerContextProps | null>(null);