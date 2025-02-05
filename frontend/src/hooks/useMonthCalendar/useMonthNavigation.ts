import { useState } from 'react';

import { getNextMonthInfo, getPrevMonthInfo } from '@/utils/date/calendar';

export const useMonthNavigation = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const goToPrevMonth = () => {
    const { month, year } = getPrevMonthInfo(currentDate);
    setCurrentDate(new Date(year, month));
  };

  const goToNextMonth = () => {
    const { month, year } = getNextMonthInfo(currentDate);
    setCurrentDate(new Date(year, month));
  };

  return { currentDate, goToPrevMonth, goToNextMonth };
};
