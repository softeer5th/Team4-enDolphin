import { createContext } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import type { TimeInfo } from '../../hooks/useSelectTime';

export const TimeTableContext = createContext<TimeInfo | null>(null);

export const useTimeTableContext = (): TimeInfo => useSafeContext(TimeTableContext);