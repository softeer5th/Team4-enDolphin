import { useState } from 'react';

import { getNextMonthInfo, getPrevMonthInfo } from '@/utils/date/calendar/calendarHelpers';

export const useMonthNavigation = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const goToPrevMonth = () => {
    const { month, year } = getPrevMonthInfo(currentMonth, currentYear);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const goToNextMonth = () => {
    const { month, year } = getNextMonthInfo(currentMonth, currentYear);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return { currentMonth, currentYear, goToPrevMonth, goToNextMonth };
};
