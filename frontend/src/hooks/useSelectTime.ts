import { useReducer } from 'react';

import { sortDate } from '@/utils/date';

export interface TimeRange {
  startTime: Date | null;
  endTime: Date | null;
}

type State = {
  selectedTime: TimeRange;
  isSelecting: boolean;
};

type Action = {
  type: 'SELECT_START' | 'SELECT_PROGRESS' | 'SELECT_END';
  date?: Date;
};

const selectReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SELECT_START': {
      if (!action.date) return state;
      return {
        selectedTime: {
          startTime: action.date,
          endTime: null,
        },
        isSelecting: true,
      };
    }
    case 'SELECT_PROGRESS': {
      if (!state.isSelecting || !action.date) return state;
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          endTime: action.date,
        },
      };
    }
    case 'SELECT_END': {
      const { startDate, endDate }
         = sortDate(state.selectedTime.startTime, state.selectedTime.endTime);
      return {
        selectedTime: {
          startTime: startDate,
          endTime: endDate,
        },
        isSelecting: false,
      };
    }
    default:
      return state;
  }
};

export interface TimeInfo {
  selectedStartTime: Date | null;
  selectedEndTime: Date | null;
  handleMouseDown: (date: Date) => void;
  handleMouseEnter: (date: Date) => void;
  handleMouseUp: () => void;
}

export const useSelectTime = (): TimeInfo => {
  const [state, dispatch] = useReducer(selectReducer, 
    { selectedTime: { startTime: null, endTime: null }, 
      isSelecting: false },
  );

  return {
    selectedStartTime: state.selectedTime.startTime,
    selectedEndTime: state.selectedTime.endTime,
    handleMouseDown: (date: Date) => dispatch({ type: 'SELECT_START', date }),
    handleMouseEnter: (date: Date) => dispatch({ type: 'SELECT_PROGRESS', date }),
    handleMouseUp: () => dispatch({ type: 'SELECT_END' }),
  };
};