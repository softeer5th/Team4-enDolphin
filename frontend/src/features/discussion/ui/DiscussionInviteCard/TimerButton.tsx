import Button from '@/components/Button';
import useCountdown from '@/hooks/useCountdown';

import { timerButtonStyle } from './index.css';

interface TimerButtonProps {
  targetDateTime: Date;
  onTimeEnd: () => void;
}

const TimerButton = ({ targetDateTime, onTimeEnd }: TimerButtonProps) => {
  const remainingTime = useCountdown(targetDateTime, onTimeEnd);
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
