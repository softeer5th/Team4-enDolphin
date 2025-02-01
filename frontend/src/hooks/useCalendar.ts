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
  const [selected, setSelected] = useState(new Date());

  const handleClickToday = () => {
    setSelected(new Date());
  };
    
  const handleClickPrevWeek = () => {
    const prevWeek = new Date(selected);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setSelected(prevWeek);
  };
    
  const handleClickNextWeek = () => {
    const nextWeek = new Date(selected);
    nextWeek.setDate(nextWeek.getDate() + 7);
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