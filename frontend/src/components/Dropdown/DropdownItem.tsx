import type { PropsWithChildren } from 'react';
import { useContext, useId } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { Text } from '../Text';
import { DropdownContext } from './DropdownContext';
import { dropdownStyle } from './dropdownItem.css';

interface DropdownItemProps extends PropsWithChildren {
  value: string;
}

export const DropdownItem = ({ value, children }: DropdownItemProps) => {
  const { controlId, selectedValue, onChange } = useSafeContext(DropdownContext);
  const defaultId = `${controlId}-item-${useId()}`;

  const handleClick = () => {
    onChange(value);
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