import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { SECOND_IN_MILLISECONDS } from '@/utils/date';

import { timerButtonStyle } from './index.css';

interface TimerButtonProps {
  targetDateTime: Date;
  onTimeEnd?: () => void;
}

const TimerButton = ({ targetDateTime: targetTime, onTimeEnd }: TimerButtonProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(targetTime.getTime() - Date.now(), 0),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(targetTime.getTime() - Date.now(), 0);
      setRemainingTime(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        if (onTimeEnd) onTimeEnd();
      }
    }, SECOND_IN_MILLISECONDS);

    return () => clearInterval(interval);
  }, [targetTime, onTimeEnd]);

  return (
    <Button
      className={timerButtonStyle}
      disabled
      size='xl'
    >
      {`${Math.floor(remainingTime / 1000)}초`}
    </Button>
  );
};

export default TimerButton;