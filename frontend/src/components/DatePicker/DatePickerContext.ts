import { createContext } from 'react';

import type { UseMonthCalendarReturn } from '@/hooks/useDatePicker';

import type { DatePickerProps } from '.';

interface DatePickerContextProps extends UseMonthCalendarReturn, DatePickerProps {}

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);