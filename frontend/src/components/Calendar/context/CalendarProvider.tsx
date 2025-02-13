import type { PropsWithChildren } from 'react';

import { useCalendar } from '../../../hooks/useCalendar';
import { CalendarContext } from './CalendarContext';
import type { CalendarSharedInfo } from './SharedCalendarContext';

interface CalendarInfo extends PropsWithChildren {
  outerContext: Partial<CalendarSharedInfo>;
  isTableUsed: boolean;
}

export const CalendarProvider = ({ outerContext, isTableUsed, children }: CalendarInfo) => {
  const calendar = useCalendar(outerContext);
  return (
    <CalendarContext.Provider value={{ ...calendar, isTableUsed }}>
      {children}
    </CalendarContext.Provider>
  );
};