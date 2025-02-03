import { createContext } from 'react';

import type { InputProps } from '.';

interface InputContextProps {
  isValid: boolean;
  type: InputProps['type'];
}

/**
 * @description Input 컴포넌트의 Context.
 * 
 * @Param {isValid} boolean - Input 컴포넌트가 Error 상태인지 여부.
 * @Param {type} InputProps['type'] - Input 컴포넌트의 타입.
 */
export const InputContext = createContext<InputContextProps | null>(null);
