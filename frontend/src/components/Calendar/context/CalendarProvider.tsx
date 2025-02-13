import type { PropsWithChildren } from 'react';

import { useCalendar } from '../../../hooks/useCalendar';
import { CalendarContext } from './CalendarContext';
import type { CalendarSharedInfo } from './SharedCalendarContext';

interface CalendarInfo extends PropsWithChildren {
  outerContext: Partial<CalendarSharedInfo>;
}

export const CalendarProvider = ({ outerContext, children }: CalendarInfo) => {
  const calendar = useCalendar(outerContext);
  return (
    <CalendarContext.Provider value={calendar}>
      {children}
    </CalendarContext.Provider>
  );
};