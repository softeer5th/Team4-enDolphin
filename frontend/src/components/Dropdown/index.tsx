import type { PropsWithChildren, ReactNode } from 'react';
import { useId, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { dropdownContainerStyle, dropdownContentStyle, dropdownTriggerStyle } from './index.css';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  width?: number | string;
  height?: number | string;
  onChange: ((value: string) => void);
  selectedValue: string;
}

export const Dropdown = ({ 
  trigger,
  width = 'auto',
  height = 'auto',
  onChange, 
  selectedValue,
  children, 
}: DropdownProps) => {
  const defaultId = `dropdown-${useId()}`;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

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
        ref={ref}
        style={{ width }}
      >
        <div className={dropdownTriggerStyle} onClick={() => setIsOpen((prev) => !prev)}>
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