import type { InputHTMLAttributes, PropsWithChildren, SetStateAction } from 'react';

export type Size = 'sm' | 'md';

export interface CheckboxProps extends PropsWithChildren {
  value?: number;
  isChecked?: boolean;
  onToggleCheck?: (prev: SetStateAction<boolean>) => void;
  type?: 'all' | 'single';
  size?: Size;
  defaultChecked?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
