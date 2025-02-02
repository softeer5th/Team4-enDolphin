import { createContext } from 'react';

interface InputContextProps {
  state: 'neutral' | 'error';
}

/**
 * @description Input 컴포넌트의 Context.
 * 
 * @param size - Input 컴포넌트의 크기.
 * @param state - Input 컴포넌트의 상태.
 */
export const InputContext = createContext<InputContextProps | null>(null);

