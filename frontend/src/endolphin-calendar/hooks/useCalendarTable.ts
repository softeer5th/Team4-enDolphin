import type { Dispatch } from 'react';
import { useReducer  } from 'react';

import { formatDateToWeekDates } from '@/utils/date';

export interface CalendarInfo {
  selected: Date;
  dates: Date[];
  dispatch: Dispatch<Action>;
  handleClickToday: () => void;
  handleClickPrevWeek: () => void;
  handleClickNextWeek: () => void;
  handleChangeWeek: (date: Date) => void;
}

type State = {
  date: Date;
  dates: Date[];
};

type Action = 
  | { type: 'SET_PREV' }
  | { type: 'SET_NEXT' }
  | { type: 'SET_TODAY' }
  | { type: 'SET_DATE'; date: Date };

const calendarReducer = (state: State, action: Action) => {
  const WEEK_TIME = 7 * 24 * 60 * 60 * 1000;
  const today = new Date();

  switch (action.type) {
    case 'SET_PREV': {
      const prevWeek = new Date(state.date.getTime() - WEEK_TIME);
      return { date: prevWeek, dates: formatDateToWeekDates(prevWeek) };
    }
    case 'SET_NEXT': {
      const nextWeek = new Date(state.date.getTime() + WEEK_TIME);
      return { date: nextWeek, dates: formatDateToWeekDates(nextWeek) };
    }
    case 'SET_TODAY': {
      return { date: today, dates: formatDateToWeekDates(today) };
    }
    case 'SET_DATE': {
      return { date: action.date, dates: formatDateToWeekDates(action.date) };
    }
    default:
      return state;
  }
};

export const useCalendarTable = (): CalendarInfo => {
  const [selected, dispatch] 
    = useReducer(calendarReducer, { 
      date: new Date(), 
      dates: formatDateToWeekDates(new Date()), 
    });

  const handleClickToday = () => {
    dispatch({ type: 'SET_TODAY' });
  };
    
  const handleClickPrevWeek = () => {
    dispatch({ type: 'SET_PREV' });
  };
    
  const handleClickNextWeek = () => {
    dispatch({ type: 'SET_NEXT' });
  };
    
  const handleChangeWeek = (date: Date) => {
    dispatch({ type: 'SET_DATE', date });
  };

  return { 
    selected: selected.date,
    dates: selected.dates,
    dispatch, 
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek, 
    handleChangeWeek, 
  };
};