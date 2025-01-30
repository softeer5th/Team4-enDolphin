
import { useContext, useState } from 'react';

import { GroupContext } from '../components/Group/GroupContext';

interface CheckedStateProps {
  defaultChecked?: boolean;
  value?: number;
  type: 'all' | 'single';
}

export const useCheckbox = ({ value, defaultChecked, type }: CheckedStateProps) => {
  const group = useContext(GroupContext);
  const [checked, setChecked] = useState(defaultChecked || false);

  const handleClickCheck = () => {
    if (group) {
      if (type === 'all') {
        group.onToggleAllCheck();
      } else if (value) {
        group.onToggleCheck(value);
      }
      return;
    }
    setChecked((checked) => !checked);
  };

  const isChecked = () => {
    if (type === 'all') return group?.isAllChecked;
    if (value) return group?.checkedList.has(value);
    return checked;
  };

  return { handleClickCheck, checked: isChecked() };
};