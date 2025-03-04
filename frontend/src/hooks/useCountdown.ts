import { useEffect, useState } from 'react';

import { SECOND_IN_MILLISECONDS } from '@/utils/date';

const useCountdown = (targetDateTime: Date, onTimeEnd?: () => void): number => {
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(targetDateTime.getTime() - Date.now(), 0),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(targetDateTime.getTime() - Date.now(), 0);
      setRemainingTime(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onTimeEnd?.();
      }
    }, SECOND_IN_MILLISECONDS);

    return () => clearInterval(interval);
  }, [targetDateTime, onTimeEnd]);

  return remainingTime;
};

export default useCountdown;
