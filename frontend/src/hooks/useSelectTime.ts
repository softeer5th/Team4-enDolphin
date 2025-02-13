import { useReducer } from 'react';

import { sortDate } from '@/utils/date';

export interface TimeRange {
  startTime: Date | null;
  endTime: Date | null;
}

type Callback<T = TimeRange> = (props?: T) => void;

type State = {
  selectedTime: TimeRange;
  doneTime: TimeRange;
  isSelecting: boolean;
};

type Action = {
  type: 'SELECT_START' | 'SELECT_PROGRESS' | 'SELECT_END' | 'SELECT_CANCEL';
  date?: Date;
  callback?: Callback;
};

const resetSelectedTime = () => ({
  startTime: null,
  endTime: null,
});

const resetDoneTime = () => ({
  startTime: null,
  endTime: null,
});

const calcDoneTimeRange = (selectedTime: TimeRange, date?: Date) => {
  const OFFSET = 15 * 60 * 1000;
  if (!selectedTime.startTime && date) {
    return {
      startTime: date,
      endTime: new Date(date.getTime() + OFFSET),
    };
  }
  const { startDate, endDate } = sortDate(selectedTime.startTime, selectedTime.endTime);
  return {
    startTime: date || startDate,
    endTime: date || endDate,
  };
};

const selectReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SELECT_START':
      if (!action.date) return state;
      return { 
        ...state, selectedTime: { startTime: action.date, endTime: null }, isSelecting: true,
      };

    case 'SELECT_PROGRESS':
      if (!state.isSelecting || !action.date) return state;
      return { 
        ...state, selectedTime: { ...state.selectedTime, endTime: action.date }, 
      };

    case 'SELECT_END': {
      const doneTime = calcDoneTimeRange(state.selectedTime, action.date);
      if (typeof action.callback === 'function') action.callback(doneTime);
      return {
        selectedTime: resetSelectedTime(),
        doneTime,
        isSelecting: false,
      };
    }

    case 'SELECT_CANCEL':
      return {
        selectedTime: resetSelectedTime(),
        doneTime: resetDoneTime(),
        isSelecting: false,
      };

    default:
      return state;
  }
};

export interface TimeInfo {
  selectedStartTime: Date | null;
  selectedEndTime: Date | null;
  doneStartTime: Date | null;
  doneEndTime: Date | null;
  handleMouseDown: (date: Date) => void;
  handleMouseEnter: (date: Date) => void;
  handleMouseUp: (callback?: Callback) => void;
  handleClick: (date: Date) => void;
  reset: () => void;
}

export const useSelectTime = (): TimeInfo => {
  const [state, dispatch] = useReducer(selectReducer, 
    { selectedTime: { startTime: null, endTime: null }, 
      doneTime: { startTime: null, endTime: null },
      isSelecting: false },
  );

  return {
    selectedStartTime: state.selectedTime.startTime,
    selectedEndTime: state.selectedTime.endTime,
    doneStartTime: state.doneTime.startTime,
    doneEndTime: state.doneTime.endTime,
    handleMouseDown: (date: Date) => dispatch({ type: 'SELECT_START', date }),
    handleMouseEnter: (date: Date) => dispatch({ type: 'SELECT_PROGRESS', date }),
    handleMouseUp: (callback) => dispatch({ type: 'SELECT_END', callback }),
    handleClick: (date: Date) => dispatch({ type: 'SELECT_END', date }),
    reset: () => dispatch({ type: 'SELECT_CANCEL' }),
  };
};