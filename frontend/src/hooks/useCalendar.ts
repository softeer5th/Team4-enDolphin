import { useState } from 'react';

export interface CalendarInfo {
  selected: Date;
  setSelected: (date: Date) => void;
  handleClickToday: () => void;
  handleClickPrevWeek: () => void;
  handleClickNextWeek: () => void;
  handleChangeWeek: (date: Date) => void;
}

export const useCalendar = (): CalendarInfo => {
  const WEEK_TIME = 7 * 24 * 60 * 60 * 1000;
  const [selected, setSelected] = useState(new Date());

  const handleClickToday = () => {
    setSelected(new Date());
  };
    
  const handleClickPrevWeek = () => {
    const prevWeek = new Date(selected.getTime() - WEEK_TIME);
    setSelected(prevWeek);
  };
    
  const handleClickNextWeek = () => {
    const nextWeek = new Date(selected.getTime() + WEEK_TIME);
    setSelected(nextWeek);
  };
    
  const handleChangeWeek = (date: Date) => {
    setSelected(date);
  };

  return { 
    selected,
    setSelected, 
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek, 
    handleChangeWeek, 
  };
};