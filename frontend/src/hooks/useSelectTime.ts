import { useReducer } from 'react';

import { sortDate } from '@/utils/date';

export interface TimeRange {
  startTime: Date | null;
  endTime: Date | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (props?: any) => void;

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
      const { startDate, endDate }
         = sortDate(state.selectedTime.startTime, state.selectedTime.endTime);
      if (typeof action.callback === 'function') action.callback({ startDate, endDate });
      return {
        selectedTime: resetSelectedTime(),
        doneTime: {
          startTime: action.date || startDate,
          endTime: action.date || endDate,
        },
        isSelecting: false,
      };
    }

    case 'SELECT_CANCEL':
      if (typeof action.callback === 'function') action.callback();
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