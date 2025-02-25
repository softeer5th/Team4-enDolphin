import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import type { ScrollTableProps } from '@/hooks/useScrollToTime';

export const TableContext = createContext<ScrollTableProps | null>(null);
export const useTableContext = () => useSafeContext(TableContext);