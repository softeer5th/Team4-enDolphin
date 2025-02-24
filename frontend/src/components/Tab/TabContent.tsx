import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import clsx from '@/utils/clsx';

import { tabContentStyle } from './index.css';
import { TabContext } from './TabContext';

interface TabContentProps extends PropsWithChildren {
  value: string;
  className?: string;
}

export const TabContent = ({ value, className, children }: TabContentProps) => {
  const { controlId, selectedValue, onChange } = useSafeContext(TabContext);
  const defaultId = `${controlId}-item-${useId()}`;

  const handleClick = () => {
    onChange(value);
  };

  const isSelected = selectedValue === value;

  if (!isSelected) return null;
  return (
    <section 
      className={clsx(className, tabContentStyle)}
      id={defaultId}
      onClick={handleClick}
    >
      {children}
    </section>
  ); 
};