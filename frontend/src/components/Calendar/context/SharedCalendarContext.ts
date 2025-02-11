import { createContext } from 'react';

export interface CalendarSharedInfo {
  selectedDate: Date;
  selectedWeek: Date[];
  handleSelectDate: (date: Date) => void;
  today: Date;
}

export const SharedCalendarContext = createContext<CalendarSharedInfo | null>(null);
