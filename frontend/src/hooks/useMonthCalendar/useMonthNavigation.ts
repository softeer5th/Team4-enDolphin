import { useState } from 'react';

import { getNextMonthInfo, getPrevMonthInfo } from '@/utils/date/calendar';

export const useMonthNavigation = () => {
  const today = new Date();
  const [baseDate, setBaseDate] = useState(today);

  const goToPrevMonth = () => {
    const { month, year } = getPrevMonthInfo(baseDate);
    setBaseDate(new Date(year, month));
  };

  const goToNextMonth = () => {
    const { month, year } = getNextMonthInfo(baseDate);
    setBaseDate(new Date(year, month));
  };

  return { baseDate, goToPrevMonth, goToNextMonth };
};
