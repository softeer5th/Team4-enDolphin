import { createContext } from 'react';

interface TabContextProps {
  controlId: string;
  selectedValue: string;
  onChange: ((value: string) => void);
}

/**
 * @description Tab 컴포넌트의 Context.
 * 
 * @param controlId - Tab 컴포넌트의 id.
 * @param selectedValue - Tab 컴포넌트의 선택된 값.
 * @param onChange - Tab 컴포넌트의 값 변경 함수.
 */
export const TabContext = createContext<TabContextProps | null>(null);