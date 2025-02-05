import { useEffect, useState } from 'react';

import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

export const useDaysInMonth = (year: number, month: number) => {
  const [daysInMonth, setDaysInMonth] = useState<Date[][]>(
    generateMonthCalendar(year, month),
  );

  useEffect(() => {
    setDaysInMonth(generateMonthCalendar(year, month));
  }, [year, month]);

  return daysInMonth;
};
