import type { PropsWithChildren } from 'react';
import { useId } from 'react';

import { useGroup } from '../../hooks/useGroup';
import { GroupContext } from './GroupContext';

export interface GroupProps extends PropsWithChildren {
  controlId?: string;
  itemIds: number[];
  defaultCheckedList?: Set<number>;
  showAllCheck?: boolean;
}
  
export const Group = ({ 
  controlId, 
  defaultCheckedList,
  itemIds,
  children, 
}: GroupProps) => {
  const { 
    checkedList,
    handleToggleCheck, 
    handleToggleAllCheck, 
    isAllChecked,
  } = useGroup({ defaultCheckedList, itemIds });

  const defaultId = `group-${useId()}`;

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