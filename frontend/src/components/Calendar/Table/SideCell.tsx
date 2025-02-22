import type { Time } from '../../../constants/date';
import { Text } from '../../Text';
import { sideCellStyle } from './index.css';

export const SideCell = ({ time }: { time: Time }) => {
  if (time === 'empty') return <div className={sideCellStyle({ time: 'empty' })} />;

  const formattedTime = ((time: 'all' | number) => {
    if (time === 'all') return '하루 종일';
    if (time < 12) return `오전 ${time}시`;
    if (time === 12) return '오후 12시';
    return `오후 ${time - 12}시`;
  })(time);

  return (
    <div
      aria-label={formattedTime}
      className={sideCellStyle({ time: time == 'all' ? 'all' : 'default' })}
      role='rowheader'
    >
      <Text 
        {...(time !== 'all' && { style: { position: 'absolute', top: -16, right: 4 } })}
        typo='caption'
      >
        {formattedTime}
      </Text>
    </div>
  );
};