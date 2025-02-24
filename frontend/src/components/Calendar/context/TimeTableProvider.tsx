import type { PropsWithChildren } from 'react';

import type { TimeInfo } from '@/hooks/useSelectTime';
import { useSelectTime } from '@/hooks/useSelectTime';

import { TimeTableContext } from './TimeTableContext';

interface TimeTableInfo extends PropsWithChildren {
  outerContext?: TimeInfo;
}

export const TimeTableProvider = ({ children, outerContext }: TimeTableInfo) => {
  const times = useSelectTime();
  return (
    <TimeTableContext.Provider value={outerContext || times}>
      {children}
    </TimeTableContext.Provider>
  );
};