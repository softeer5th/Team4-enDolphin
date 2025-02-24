import { createContext } from 'react';

export interface TabContextProps<T extends string = string> {
  controlId: string;
  selectedValue: T;
  onChange: ((value: T) => void);
}

/**
 * @description Tab 컴포넌트의 Context.
 * 
 * @param controlId - Tab 컴포넌트의 id.
 * @param selectedValue - Tab 컴포넌트의 선택된 값.
 * @param onChange - Tab 컴포넌트의 값 변경 함수.
 */
export const TabContext = createContext<TabContextProps<string> | null>(null);