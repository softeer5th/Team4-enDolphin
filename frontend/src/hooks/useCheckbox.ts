
import type { SetStateAction } from 'react';
import { useContext, useState } from 'react';

import { GroupContext } from '../components/Group/GroupContext';

interface CheckedStateProps {
  defaultChecked?: boolean;
  value?: number;
  isChecked?: boolean;
  onToggleCheck?: (prev: SetStateAction<boolean>) => void;
  type: 'all' | 'single';
}

interface UseCheckboxReturn {
  handleClickCheck: () => void;
  checked: boolean;
}

export const useCheckbox = ({ 
  value, 
  defaultChecked, 
  isChecked, 
  onToggleCheck, 
  type, 
}: CheckedStateProps): UseCheckboxReturn => {
  const group = useContext(GroupContext);
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);
  
  const handleClickCheck = () => {
    if (group) {
      if (type === 'all') {
        group.onToggleAllCheck();
      } else if (value) {
        group.onToggleCheck(value);
      }
    } else if (onToggleCheck) {
      onToggleCheck((prev) => !prev);
    } else setChecked((checked) => !checked);
  };

  const findIsChecked = () => {
    if (group) {
      if (type === 'all') return group.isAllChecked;
      if (value) return group.checkedList.has(value);
    }
    if (isChecked) return isChecked;
    return checked;
  };

  return { handleClickCheck, checked: findIsChecked() };
};