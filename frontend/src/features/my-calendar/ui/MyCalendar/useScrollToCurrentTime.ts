import { useEffect, useRef } from 'react';

import { TIME_HEIGHT } from '@/constants/date';
import { getTimeParts } from '@/utils/date';

export const useScrollToCurrentTime = () => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const heightRef = useRef<number>(0);

  useEffect(() => {
    if (tableRef.current) {
      const { hour, minute } = getTimeParts(new Date());
      const offset = (hour + minute / 60) * TIME_HEIGHT + 16;
      heightRef.current = offset;
      tableRef.current.scrollTo({
        top: heightRef.current - 5 * TIME_HEIGHT,
        behavior: 'smooth',
      });
    }
  }, []);

  return { tableRef, height: heightRef.current };
};
