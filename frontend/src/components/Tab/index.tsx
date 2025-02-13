import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import clsx from '@/utils/clsx';

import { tabContainerStyle } from './index.css';
import { TabContent } from './TabContent';
import { TabContext } from './TabContext';
import { TabItem } from './TabItem';
import { TabItemList } from './TabItemList';

interface TabProps extends PropsWithChildren {
  onChange: ((value: string) => void);
  selectedValue: string;
  className?: string;
}

export const Tab = ({ 
  onChange, 
  selectedValue,
  children, 
  className,
}: TabProps) => {
  const defaultId = `Tab-${useId()}`;

  return (
    <TabContext.Provider 
      value={{ 
        controlId: defaultId, 
        selectedValue,
        onChange,
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