import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useCalendarContext } from '@/endolphin-calendar/context/CalendarContext';
import { formatDateToWeek } from '@/utils/date';

import { timeControlButtonStyle } from './index.css';
import { TimeControlButton } from './TimeControlButton';

export const TimeControl = () => {
  const { selectedDate } = useCalendarContext();
  const { year, month, week } = formatDateToWeek(selectedDate);
  const weekString = `${year}년 ${month}월 ${week}`;

  return  (
    <Flex
      align='center'
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