import type { PropsWithChildren, ReactNode } from 'react';

import { dropdownContainerStyle, dropdownContentStyle } from './index.css';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  height: number;
}

export const Dropdown = ({ trigger, height, children }: DropdownProps) => (
  <div className={dropdownContainerStyle}>
    {trigger}
    <ul className={dropdownContentStyle} style={{ height }}>
      {children}
    </ul>
  </div>
);