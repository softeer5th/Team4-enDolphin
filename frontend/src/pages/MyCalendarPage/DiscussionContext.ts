import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import type { DateRangeReturn } from '@/hooks/useSelectDateRange';

export const DiscussionContext = createContext<DateRangeReturn | null>(null);
export const useDiscussionContext = () => useSafeContext(DiscussionContext);