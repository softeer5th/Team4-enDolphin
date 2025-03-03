import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { adjustmentStatusMap } from '@/constants/statusMap';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date/format';

import { cardContentStyle, cardTextStyle, cardTitleStyle } from './index.css';
import type { CalendarCardProps } from './type';

const CalendarCardChip = ({ status, size }: Pick<CalendarCardProps, 'status' | 'size'>) => {
  if (size === 'sm' || size === 'md') return null;
  
  return (
    <Chip color={adjustmentStatusMap[status].color} style={{ whiteSpace: 'nowrap' }}>
      {adjustmentStatusMap[status].label}
    </Chip>
  );
};
  
const CalendarCardTimezone = (
  { startTime, endTime }: Pick<CalendarCardProps, 'startTime' | 'endTime'>,
) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
    {formatDateToTimeString(startTime)}
    -
    {formatDateToTimeString(endTime)}
  </Text>
);
  
export const CardContents = (
  { status, size, title, endTime, startTime }: 
  Omit<CalendarCardProps, 'id' | 'style' | 'syncWithGoogleCalendar'>,
) => (
  <Flex
    className={cardContentStyle({ status, size })}
    direction='column'
    gap={size === 'lg' ? 200 : 100}
  >
    <CalendarCardChip size={size} status={status} />
    <Flex 
      align={size === 'sm' ? 'center' : 'flex-start'}
      className={cardTextStyle}
      direction={size === 'sm' ? 'row' : 'column'} 
      gap={size === 'sm' ? 200 : 50}
    >
      <CalendarCardTimezone endTime={endTime} startTime={startTime} />
      <Text
        className={cardTitleStyle({ size })}
        color={vars.color.Ref.Netural[800]}
        typo={size === 'sm' ? 't3' : 't1'}
      >
        {title}
      </Text>
    </Flex>
  </Flex>
);
    