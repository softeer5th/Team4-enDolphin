import { Flex } from '@/components/Flex';
import { formatDateToWeek } from '@/utils/date';

import { Text } from '../../Text';
import { useCalendarContext } from '../context/CalendarContext';
import { timeControlButtonStyle, timeControlStyle } from './index.css';
import { TimeControlButton } from './TimeControlButton';

export const TimeControl = () => {
  const { selected } = useCalendarContext();
  const { year, month, week } = formatDateToWeek(selected);
  const weekString = `${year}년 ${month}월 ${week}`;

  return  (
    <Flex
      align='center'
      className={timeControlStyle}
      gap={200}
      justify='flex-start'
    >
      <Flex align='center' justify='flex-start'>
        <TimeControlButton type='prev' />
        <span className={timeControlButtonStyle({ order: 'mid' })}>
          <Text>{weekString}</Text>
        </span>
        <TimeControlButton type='next' />
      </Flex>
      <TimeControlButton type='today' />
    </Flex>
  );
};