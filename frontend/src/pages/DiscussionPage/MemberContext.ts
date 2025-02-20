import { createContext, useContext } from 'react';

import type { FormState } from '@/hooks/useFormState';

export interface MemberContextProps {
  checkedList: number[] | null;
}
  
export const MemberContext = createContext<FormState<MemberContextProps> | null>(null);
  
export const useMemberContext = () => useContext(MemberContext);
