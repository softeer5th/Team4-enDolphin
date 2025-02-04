import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { GoggleCalendar, Pencil } from '@/components/Icon';
import { Text } from '@/components/Text';
import type { AdjustmentStatus } from '@/constants/statusMap';
import { adjustmentStatusMap } from '@/constants/statusMap';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';

import {
  cardBackgroundStyle, 
  cardBottomStyle,
  cardContainerStyle, 
  cardContentStyle, 
} from './index.css';

interface CalendarCardProps {
  status: AdjustmentStatus; 
  title: string;
  startTime: Date;
  endTime: Date;
}
  
export const CalendarCard = ({ 
  status = 'fixed', title, startTime, endTime }: CalendarCardProps,
) => (
  <div className={cardContainerStyle({ status })}>
    <Flex className={cardBackgroundStyle} direction='column'>
      <Flex
        className={cardContentStyle({ status })}
        direction='column'
        gap={300}
      >
        <Chip color={adjustmentStatusMap[status].color}>
          {adjustmentStatusMap[status].label}
        </Chip>
        <Flex direction='column' gap={50}>
          <Text typo='b3R'>
            {formatDateToTimeString(startTime)}
            -
            {formatDateToTimeString(endTime)}
          </Text>
          <Text typo='t1'>
            {title}
          </Text>
        </Flex>
      </Flex>
      <Flex
        align='flex-end'
        className={cardBottomStyle}
        gap={200}
        height='100%'
        justify='flex-end'
        width='full'
      >
        <GoggleCalendar />
        <Pencil fill={vars.color.Ref.Netural[600]} />
      </Flex>
    </Flex>
  </div>
);