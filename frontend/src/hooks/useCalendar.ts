import { useState } from 'react';

import type { CalendarSharedInfo } from '@/components/Calendar/context/SharedCalendarContext';
import { isObjectEmpty } from '@/utils/common';
import { formatDateToWeekDates } from '@/utils/date';

export interface CalendarInfo {
  selected: Date;
  dates: Date[];
  handleClickToday: () => void;
  handleClickPrevWeek: () => void;
  handleClickNextWeek: () => void;
  handleChangeWeek: (date: Date) => void;
}

export const useCalendar 
= (outerContext: CalendarSharedInfo = {} as CalendarSharedInfo): CalendarInfo => {
  const WEEK_TIME = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();
  const [selected, setSelected] = useState(today);

  const handleChangeWeek = (date: Date) => {
    if (isObjectEmpty(outerContext) && outerContext && outerContext.handleSelectDate) {
      outerContext.handleSelectDate(date);
      return;
    }
    setSelected(date);
  };

  const handleClickToday = () => {
    handleChangeWeek(today);
  };
    
  const handleClickPrevWeek = () => {
    const selectedDate = outerContext?.selectedDate || selected;
    const prevWeek = new Date(selectedDate.getTime() - WEEK_TIME);
    handleChangeWeek(prevWeek);
  };
    
  const handleClickNextWeek = () => {
    const selectedDate = outerContext?.selectedDate || selected;
    const nextWeek = new Date(selectedDate.getTime() + WEEK_TIME);
    handleChangeWeek(nextWeek);
  };

  return { 
    selected: outerContext?.selectedDate || selected,
    dates: formatDateToWeekDates(outerContext?.selectedDate || selected),
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek, 
    handleChangeWeek, 
  };
};