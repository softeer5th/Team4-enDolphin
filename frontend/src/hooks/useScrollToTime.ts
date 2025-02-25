import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import { TIME_HEIGHT } from '@/constants/date';
import { getTimeParts, type Time } from '@/utils/date';

export interface ScrollTableProps {
  tableRef: RefObject<HTMLDivElement | null>;
  height: number;
  handleSelectTime: (time: Time) => void;
}

export const useScrollToTime = (): ScrollTableProps => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState<Time>(getTimeParts(new Date()));
  const offset = 6.5 + (time.hour + time.minute / 60) * TIME_HEIGHT;

  useEffect(() => {
    if (time && tableRef.current) {
      tableRef.current.scrollTo({
        top: offset - 5 * TIME_HEIGHT,
        behavior: 'smooth',
      });
    }
  }, [time, offset]);

  const handleSelectTime = ({ hour, minute }: Time) => {
    setTime({ hour, minute });
  };

  return { tableRef, height: offset, handleSelectTime };
};
