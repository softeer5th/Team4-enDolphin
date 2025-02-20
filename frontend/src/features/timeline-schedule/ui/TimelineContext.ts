import { createContext } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';

interface TimelineContextProps {
  isConfirmedSchedule: boolean;  
}

export const TimelineContext = createContext<TimelineContextProps | null>(null);

export const useTimelineContext = () => useSafeContext(TimelineContext);