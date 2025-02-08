import { createContext } from 'react';

interface DropdownContextProps {
  controlId: string;
  selectedValue: string;
  onChange: ((value: string) => void);
  setIsOpen: ((isOpen: boolean) => void);
}

/**
 * @description Dropdown 컴포넌트의 Context.
 * 
 * @param controlId - Dropdown 컴포넌트의 id.
 * @param selectedValue - Dropdown 컴포넌트의 선택된 값.
 * @param onChange - Dropdown 컴포넌트의 값 변경 함수.
* @param setIsOpen - Dropdown 컴포넌트의 오픈 상태 변경 함수.
 */
export const DropdownContext = createContext<DropdownContextProps | null>(null);