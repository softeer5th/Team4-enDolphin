import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import type { GroupStateReturn } from '@/hooks/useGroup';

import { GroupContext } from './GroupContext';

export interface GroupProps extends PropsWithChildren {
  groupInfos: GroupStateReturn;
  controlId?: string;
  itemIds?: number[];
  defaultCheckedList?: Set<number>;
  showAllCheck?: boolean;
}
  
export const Group = ({ 
  controlId, 
  groupInfos,
  children, 
}: GroupProps) => {

  const defaultId = `group-${useId()}`;
  const { checkedList, isAllChecked, handleToggleCheck, handleToggleAllCheck } = groupInfos;

  return (
    <GroupContext.Provider value={{ 
      controlId: controlId || defaultId,
      checkedList,
      onToggleCheck: handleToggleCheck,
      onToggleAllCheck: handleToggleAllCheck,
      isAllChecked,
    }}>
      {children}
    </GroupContext.Provider>
  ); 
};