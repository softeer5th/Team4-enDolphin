import { useState } from 'react';

import type { CalendarSharedInfo } from '../types';
import { formatDateToWeekDates } from '../utils/date';

export const useCalendar = (): CalendarSharedInfo => {
  const [selected, setSelected] = useState(new Date());

  const handleSelectDate = (date: Date) => {
    setSelected(date);
  };

  return {
    selectedDate: selected,
    selectedWeek: formatDateToWeekDates(selected),
    handleSelectDate,
    today: new Date(),
  };
};