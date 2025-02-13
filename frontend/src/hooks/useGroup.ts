import { useReducer } from 'react';

type State = {
  checkedList: Set<number>;
  isAllChecked: boolean;
};

type Action = 
  | { type: 'TOGGLE_ITEM'; id: number; itemIds: number[] }
  | { type: 'TOGGLE_ALL'; itemIds: number[] }
  | { type: 'RESET' };
  
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

    default:
      return state;
  }
};

interface GroupStateProps {
  defaultCheckedList?: Set<number>;
  itemIds: number[];
}

export interface GroupStateReturn {
  checkedList: Set<number>;
  handleToggleCheck: (id: number) => void;
  isAllChecked: boolean;
  handleToggleAllCheck: () => void;
  reset: () => void;
}

export const useGroup = ({ 
  defaultCheckedList = new Set(), 
  itemIds, 
}: GroupStateProps): GroupStateReturn => {  
  const isAllChecked = defaultCheckedList.size === itemIds.length;

  const [state, dispatch] = useReducer(reducer, { checkedList: defaultCheckedList, isAllChecked });

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
  };
};