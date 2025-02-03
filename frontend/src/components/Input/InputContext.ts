import { createContext } from 'react';

interface InputContextProps {
  isValid: boolean;
}

/**
 * @description Input 컴포넌트의 Context.
 * 
 * @Param {isValid} boolean - Input 컴포넌트가 Error 상태인지 여부.
 */
export const InputContext = createContext<InputContextProps | null>(null);
