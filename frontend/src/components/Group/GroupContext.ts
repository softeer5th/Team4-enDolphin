import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

interface GroupContextProps {
  controlId: string;
  checkedList: Set<number>;
  onToggleCheck: (id: number) => void;
  onToggleAllCheck: () => void;
  reset: () => void;
  isAllChecked: boolean;
}

/**
 * @description Group 컴포넌트의 Context.
 * 
 * @param [controlId] - Group 컴포넌트의 id.
 * @param [checkedList] - Group 컴포넌트의 체크된 목록.
 * @param [onToggleCheck] - Group 컴포넌트의 체크박스를 토글하는 함수.
 * @param [onToggleAllCheck] - Group 컴포넌트의 전체 체크박스를 토글하는 함수.
 * @param [reset] - Group 컴포넌트의 체크박스를 초기화하는 함수.
 * @param [isAllChecked] - Group 컴포넌트의 전체 체크박스가 체크되었는지 여부.
 */
export const GroupContext = createContext<GroupContextProps | null>(null);

export const useGroupContext = () => useSafeContext(GroupContext);