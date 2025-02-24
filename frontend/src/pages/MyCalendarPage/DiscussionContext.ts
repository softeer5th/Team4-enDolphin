import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import type { DateRangeReturn } from '@/hooks/useSelectDateRange';

interface DiscussionContextProps extends DateRangeReturn {
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
}

export const DiscussionContext = createContext<DiscussionContextProps | null>(null);
export const useDiscussionContext = () => useSafeContext(DiscussionContext);