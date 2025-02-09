import type { Context } from 'react';
import { useContext } from 'react';

export const useSafeContext = <T>(context: Context<T | null>): T => {
  const value = useContext(context);
    
  if (!value) {
    throw new Error('🚨 이 컴포넌트는 ContextProvider 내부에서 사용되어야 합니다!');
  }
    
  return value;
};