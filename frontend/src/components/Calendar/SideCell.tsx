import { Text } from '../Text';
import { sideCellStyle } from './index.css';
import type { Time } from './types';

export const SideCell = ({ time }: { time: Time }) => {
  if (time === 'empty') return <div className={sideCellStyle({ time: 'empty' })} />;

  const formatTimeToString = (time: 'all' | number) => {
    if (time === 'all') return '하루 종일';
    if (time < 12) return `오전 ${time}시`;
    if (time === 12) return '오후 12시';
    return `오후 ${time - 12}시`;
  };

  return (
    <div className={sideCellStyle({ time: time == 'all' ? 'all' : 'default' })}>
      <Text 
        {...(time !== 'all' && { style: { position: 'absolute', top: -16, right: 4 } })}
        typo='caption'
      >
        {formatTimeToString(time)}
      </Text>
    </div>
  );
};