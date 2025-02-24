import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import clsx from '@/utils/clsx';

import { tabContainerStyle } from './index.css';
import { TabContent } from './TabContent';
import { TabContext } from './TabContext';
import { TabItem } from './TabItem';
import { TabItemList } from './TabItemList';

interface TabProps<T extends string = string> extends PropsWithChildren {
  onChange: ((value: T) => void);
  selectedValue: T;
  className?: string;
}

export const Tab = <T extends string, _ = null>({ 
  onChange, 
  selectedValue,
  children, 
  className,
}: TabProps<T>) => {
  const defaultId = `Tab-${useId()}`;

  return (
    <TabContext.Provider
      value={{ 
        controlId: defaultId, 
        selectedValue,
        onChange: onChange as (value: string) => void,
      }}
    >
      <div className={clsx(className, tabContainerStyle)} id={defaultId}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

Tab.List = TabItemList;
Tab.Item = TabItem;
Tab.Content = TabContent;