import { useEffect, useState } from 'react';

import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

export const useDaysInMonth = (baseDate: Date) => {
  const [daysInMonth, setDaysInMonth] = useState<Date[][]>(
    generateMonthCalendar(baseDate),
  );

  useEffect(() => {
    setDaysInMonth(generateMonthCalendar(baseDate));
  }, [baseDate]);

  return daysInMonth;
};
