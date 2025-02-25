import { useEffect, useRef } from 'react';

import { TIME_HEIGHT } from '@/constants/date';

export const useScrollToTime = ({ hour, minute }: { hour: number; minute: number }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
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
