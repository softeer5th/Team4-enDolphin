import type { PropsWithChildren } from 'react';

import { useSelectTime } from '@/hooks/useSelectTime';

import { TimeTableContext } from './TimeTableContext';

export const TimeTableProvider = ({ children }: PropsWithChildren) => {
  const times = useSelectTime();
  return (
    <TimeTableContext.Provider value={times}>
      {children}
    </TimeTableContext.Provider>
  );
};