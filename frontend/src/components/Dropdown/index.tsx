import { type PropsWithChildren, type ReactNode, useId } from 'react';

import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { dropdownContainerStyle, dropdownContentStyle } from './index.css';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  height: number;
  onChange: ((value: string) => void);
  selectedValue: string;
}

export const Dropdown = ({ 
  trigger, 
  height, 
  onChange, 
  selectedValue,
  children, 
}: DropdownProps) => {
  const defaultId = `dropdown-${useId()}`;

  return (
    <DropdownContext.Provider value={{ 
      controlId: defaultId, 
      selectedValue,
      onChange,
    }}>
      <div className={dropdownContainerStyle} id={defaultId}>
        {trigger}
        <ul className={dropdownContentStyle} style={{ height }}>
          {children}
        </ul>
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Item = DropdownItem;