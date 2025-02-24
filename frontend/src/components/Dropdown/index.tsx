import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { useId, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { DropdownContents } from './DropdownContents';
import { DropdownContext } from './DropdownContext';
import { DropdownItem } from './DropdownItem';
import { dropdownContainerStyle, dropdownTriggerStyle } from './index.css';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  width?: number | string;
  style?: CSSProperties;
  onChange?: ((value: string) => void);
  selectedValue?: string;
}

export const Dropdown = ({ 
  trigger,
  width = 'auto',
  style,
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
        style={{ width, ...style }}
      >
        <div className={dropdownTriggerStyle} onClick={() => setIsOpen((prev) => !prev)}>
          {trigger}
        </div>
        {isOpen && children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Contents = DropdownContents;
Dropdown.Item = DropdownItem;