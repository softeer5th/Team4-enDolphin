import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { SECOND_IN_MILLISECONDS } from '@/utils/date';

import { timerButtonStyle } from './index.css';

interface TimerButtonProps {
  targetDateTime: Date; // 목표 시간: 이 시간이 지나면 타이머가 0이 됨
  onTimeEnd?: () => void;
}

const TimerButton = ({ targetDateTime: targetTime, onTimeEnd }: TimerButtonProps) => {
  // 남은 시간을 밀리초 단위로 계산 (음수 방지를 위해 Math.max 사용)
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