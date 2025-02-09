import { createContext } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import type { CalendarSharedInfo } from '../types';

export const CalendarContext = createContext<CalendarSharedInfo | null>(null);

export const useCalendarContext = (): CalendarSharedInfo => useSafeContext(CalendarContext);