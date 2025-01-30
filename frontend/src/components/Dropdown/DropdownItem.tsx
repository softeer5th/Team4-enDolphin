import type { PropsWithChildren } from 'react';

import { Text } from '../Text';
import { dropdownStyle } from './dropdownItem.css';

interface DropdownItemProps extends PropsWithChildren {
  selected: boolean;
}

export const DropdownItem = ({ selected, children }: DropdownItemProps) => (
  <li className={dropdownStyle({ state: selected ? 'selected' : 'rest' })}>
    <Text typo='b3R'>{children}</Text>
  </li>
);