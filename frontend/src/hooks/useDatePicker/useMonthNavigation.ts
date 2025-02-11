import { useState } from 'react';

import { getNextMonthInfo, getPrevMonthInfo } from '@/utils/date/calendar';

export const useMonthNavigation = (initialBaseDate?: Date) => {
  const [baseDate, setBaseDate] = useState(initialBaseDate ?? new Date());

  const gotoPrevMonth = () => {
    const { month, year } = getPrevMonthInfo(baseDate);
    setBaseDate(new Date(year, month));
  };

  const gotoNextMonth = () => {
    const { month, year } = getNextMonthInfo(baseDate);
    setBaseDate(new Date(year, month));
  };

  return { baseDate, setBaseDate, gotoPrevMonth, gotoNextMonth };
};
