import { useReducer } from 'react';

type State = {
  checkedList: Set<number>;
  isAllChecked: boolean;
};

type Action = 
  | { type: 'TOGGLE_ITEM'; id: number; itemIds: number[] }
  | { type: 'TOGGLE_ALL'; itemIds: number[] }
  | { type: 'RESET' }
  | { type: 'INIT'; defaultCheckedList: number[]; itemIds: number[] };
  
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const newCheckedList = new Set(state.checkedList);
      if (newCheckedList.has(action.id)) {
        newCheckedList.delete(action.id);
      } else {
        newCheckedList.add(action.id);
      }
      const isAllChecked = newCheckedList.size === action.itemIds.length;
      return { checkedList: newCheckedList, isAllChecked };
    }

    case 'TOGGLE_ALL': {
      if (state.isAllChecked) {
        return { isAllChecked: false, checkedList: new Set() };
      }
      return { isAllChecked: true, checkedList: new Set(action.itemIds) };
    }

    case 'RESET': {
      return { checkedList: new Set(), isAllChecked: false };
    }

    case 'INIT': {
      return { 
        checkedList: new Set(action.defaultCheckedList),
        isAllChecked: action.defaultCheckedList.length === action.itemIds.length, 
      };
    }

    default:
      return state;
  }
};

interface GroupStateProps {
  defaultCheckedList?: number[];
  itemIds: number[];
}

export interface GroupStateReturn {
  checkedList: Set<number>;
  handleToggleCheck: (id: number) => void;
  isAllChecked: boolean;
  handleToggleAllCheck: () => void;
  reset: () => void;
  init: () => void;
}

export const useGroup = ({ 
  defaultCheckedList = [], 
  itemIds, 
}: GroupStateProps): GroupStateReturn => {  
  const [state, dispatch] = useReducer(
    reducer, { 
      checkedList: new Set(defaultCheckedList), 
      isAllChecked: defaultCheckedList.length === itemIds.length, 
    });

  const handleToggleCheck = (id: number) => {
    dispatch({ type: 'TOGGLE_ITEM', id, itemIds });
  };

  const handleToggleAllCheck = () => {
    dispatch({ type: 'TOGGLE_ALL', itemIds });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return { 
    checkedList: state.checkedList, 
    handleToggleCheck, 
    isAllChecked: state.isAllChecked,
    handleToggleAllCheck, 
    reset,
    init: () => dispatch({ type: 'INIT', defaultCheckedList, itemIds }),
  };
};