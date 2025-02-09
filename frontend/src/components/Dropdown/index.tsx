import type { PropsWithChildren, ReactNode } from 'react';
import { useId, useState } from 'react';

import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { dropdownContainerStyle, dropdownContentStyle } from './index.css';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  width?: number | string;
  height: number;
  onChange: ((value: string) => void);
  selectedValue: string;
}

export const Dropdown = ({ 
  trigger,
  width = 'auto',
  height, 
  onChange, 
  selectedValue,
  children, 
}: DropdownProps) => {
  const defaultId = `dropdown-${useId()}`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider 
      value={{ 
        controlId: defaultId, 
        selectedValue,
        onChange,
        setIsOpen,
      }}
    >
      <div
        className={dropdownContainerStyle}
        id={defaultId}
        style={{ width }}
      >
        <div onClick={() => setIsOpen((prev) => !prev)}>
          {trigger}
        </div>
        {
          isOpen && 
          <ul className={dropdownContentStyle} style={{ height }}>
            {children}
          </ul>
        }
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Item = DropdownItem;