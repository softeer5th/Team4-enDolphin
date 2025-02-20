import { useEffect, useRef } from 'react';

import { TIME_HEIGHT } from '@/constants/date';
import { getTimeParts } from '@/utils/date';

export const useScrollToCurrentTime = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const { hour, minute } = getTimeParts(new Date());
  const offset = 6.5 + (hour + minute / 60) * TIME_HEIGHT;

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        top: offset - 5 * TIME_HEIGHT,
        behavior: 'smooth',
      });
    }
  }, [offset]);

  return { tableRef, height: offset };
};
