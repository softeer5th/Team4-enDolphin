import { formatDateToWeek } from '@/utils/date';

import { Text } from '../../Text';
import { useCalendarContext } from '../context/CalendarContext';
import { 
  timeControlButtonStyle, 
  timeControlButtonWrapperStyle, 
  timeControlStyle,
} from './index.css';
import { TimeControlButton } from './TimeControlButton';

export const TimeControl = () => {
  const { selected } = useCalendarContext();
  const { year, month, week } = formatDateToWeek(selected);
  const weekString = `${year}년 ${month}월 ${week}`;

  return  (
    <div className={timeControlStyle}>
      <div className={timeControlButtonWrapperStyle}>
        <TimeControlButton type='prev' />
        <span className={timeControlButtonStyle({ order: 'mid' })}>
          <Text>{weekString}</Text>
        </span>
        <TimeControlButton type='next' />
      </div>
      <TimeControlButton type='today' />
    </div>
  );
};