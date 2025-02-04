import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import type { AdjustmentStatus } from '@/constants/statusMap';
import { adjustmentStatusMap } from '@/constants/statusMap';
import { formatDateToTimeString } from '@/utils/date';

import { CardBottom } from './CardBottom';
import {
  cardBackgroundStyle, 
  cardContainerStyle, 
  cardContentStyle, 
} from './index.css';

export interface CalendarCardProps {
  status: AdjustmentStatus; 
  title: string;
  startTime: Date;
  endTime: Date;
  onClickGoggle: () => void;
  onClickEdit: () => void;
}
  
export const CalendarCard = ({ 
  status, title, startTime, endTime, ...handlers }: CalendarCardProps,
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
      <CardBottom {...handlers} />
    </Flex>
  </div>
);