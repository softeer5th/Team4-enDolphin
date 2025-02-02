import { createContext } from 'react';

import type { CalendarInfo } from '../../../hooks/useCalendar';
import { useSafeContext } from '../../../hooks/useSafeContext';

export const CalendarContext = createContext<CalendarInfo | null>(null);

export const useCalendarContext = (): CalendarInfo => useSafeContext(CalendarContext);