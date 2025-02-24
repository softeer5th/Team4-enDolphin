import type { CSSProperties, PropsWithChildren } from 'react';
import { useId } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import clsx from '@/utils/clsx';

import { Text } from '../Text';
import { DropdownContext } from './DropdownContext';
import { dropdownStyle } from './dropdownItem.css';

interface DropdownItemProps extends PropsWithChildren {
  value: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const DropdownItem = ({ value, style, onClick, className, children }: DropdownItemProps) => {
  const { controlId, selectedValue, onChange, setIsOpen } = useSafeContext(DropdownContext);
  const defaultId = `${controlId}-item-${useId()}`;

  const handleClick = () => {
    onChange?.(value);
    onClick?.();
    setIsOpen(false);
  };

  const isSelected = selectedValue === value;
  
  return (
    <li
      className={clsx(className, dropdownStyle({ state: isSelected ? 'selected' : 'rest' }))}
      id={defaultId} 
      onClick={handleClick} 
      style={style}
    >
      <Text typo='b3R'>{children}</Text>
    </li>
  );
};