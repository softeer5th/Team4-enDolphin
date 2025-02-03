import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

import { Text } from '../Text';
import { tabItemStyle } from './index.css';
import { TabContext } from './TabContext';

interface TabItemProps extends PropsWithChildren {
  value: string;
}

export const TabItem = ({ value, children }: TabItemProps) => {
  const { controlId, selectedValue, onChange } = useSafeContext(TabContext);
  const defaultId = `${controlId}-item-${useId()}`;

  const handleClick = () => {
    onChange(value);
  };

  const isSelected = selectedValue === value;
  
  return (
    <li 
      className={tabItemStyle({ state: isSelected ? 'selected' : 'default' })} 
      id={defaultId} 
      onClick={handleClick}
    >
      <Text typo='t2'>{children}</Text>
    </li>
  );
};