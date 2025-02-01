import { createContext } from 'react';

// 🔥 공통 속성을 Context로 관리
interface InputContextProps {
  size: 'md';
  state: 'neutral' | 'error';
  multiInput: boolean;
}

/**
 * @description Input 컴포넌트의 Context.
 * 
 * @param size - Input 컴포넌트의 크기.
 * @param state - Input 컴포넌트의 상태.
 */
export const InputContext = createContext<InputContextProps | null>(null);

