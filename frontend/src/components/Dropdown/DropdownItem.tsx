import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

import { Text } from '../Text';
import { DropdownContext } from './DropdownContext';
import { dropdownStyle } from './dropdownItem.css';

interface DropdownItemProps extends PropsWithChildren {
  value: string;
}

export const DropdownItem = ({ value, children }: DropdownItemProps) => {
  const { controlId, selectedValue, onChange, setIsOpen } = useSafeContext(DropdownContext);
  const defaultId = `${controlId}-item-${useId()}`;

  const handleClick = () => {
    onChange(value);
    setIsOpen(false);
  };

  const isSelected = selectedValue === value;
  
  return (
    <li 
      className={dropdownStyle({ state: isSelected ? 'selected' : 'rest' })} 
      id={defaultId} 
      onClick={handleClick}
    >
      <Text typo='b3R'>{children}</Text>
    </li>
  );
};