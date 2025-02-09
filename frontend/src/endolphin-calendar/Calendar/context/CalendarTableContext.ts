import { createContext } from 'react';

import type { CalendarInfo } from '../../hooks/useCalendarTable';
import { useSafeContext } from '../../hooks/useSafeContext';

export const CalendarTableContext = createContext<CalendarInfo | null>(null);

export const useCalendarTableContext = (): CalendarInfo => useSafeContext(CalendarTableContext);