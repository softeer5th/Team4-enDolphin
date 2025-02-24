import { createContext } from 'react';

import type { CalendarInfo } from '@/hooks/useCalendar';
import { useSafeContext } from '@/hooks/useSafeContext';

interface CalendarContextProps extends CalendarInfo {
  isTableUsed: boolean;
}

export const CalendarContext = createContext<CalendarContextProps | null>(null);

export const useCalendarContext = (): CalendarContextProps => useSafeContext(CalendarContext);