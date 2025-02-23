import { useState } from 'react';

import type { CalendarSharedInfo } from '@/components/Calendar/context/SharedCalendarContext';

import { formatDateToWeekDates } from '../utils/date';
import { useMonthNavigation } from './useDatePicker/useMonthNavigation';

export const useSharedCalendar = (): CalendarSharedInfo => {
  const [selected, setSelected] = useState(new Date());
  const { baseDate, setBaseDate, gotoPrevMonth, gotoNextMonth } = useMonthNavigation();

  const handleSelectDate = (date: Date) => {
    setSelected(date);
    setBaseDate(new Date(date.getFullYear(), date.getMonth()));
  };

  return {
    selectedDate: selected,
    selectedWeek: formatDateToWeekDates(selected),
    handleSelectDate,
    today: new Date(),
    baseDate,
    gotoPrevMonth,
    gotoNextMonth,
  };
};