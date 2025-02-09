import type { PropsWithChildren } from 'react';

import { useCalendar } from '../hooks/useCalendar';
import { CalendarContext } from './CalendarContext';

export const CalendarProvider = ({ children }: PropsWithChildren) => {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      {children}
    </CalendarContext.Provider>
  );
};