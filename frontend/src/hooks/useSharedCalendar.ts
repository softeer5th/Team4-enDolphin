import { useState } from 'react';

import type { CalendarSharedInfo } from '@/components/Calendar/context/SharedCalendarContext';

import { formatDateToWeekDates } from '../utils/date';

export const useSharedCalendar = (): CalendarSharedInfo => {
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