import type { PropsWithChildren } from 'react';

import { useCalendarTable } from '../../hooks/useCalendarTable';
import { CalendarTableContext } from './CalendarTableContext';

export const CalendarTableProvider = ({ children }: PropsWithChildren) => {
  const calendar = useCalendarTable();
  return (
    <CalendarTableContext.Provider value={calendar}>
      {children}
    </CalendarTableContext.Provider>
  );
};