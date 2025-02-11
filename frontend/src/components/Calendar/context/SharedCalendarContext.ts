import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

export interface CalendarSharedInfo {
  selectedDate: Date;
  selectedWeek: Date[];
  handleSelectDate: (date: Date) => void;
  today: Date;
}

export const SharedCalendarContext = createContext<CalendarSharedInfo | null>(null);

export const useSharedCalendarContext = () => useSafeContext(SharedCalendarContext);