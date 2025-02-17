import type { CSSProperties } from 'react';

import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import type { AdjustmentStatus } from '@/constants/statusMap';
import { adjustmentStatusMap } from '@/constants/statusMap';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date/format';

import { CardBottom } from './CardBottom';
import {
  cardBackgroundStyle, 
  cardContainerStyle, 
  cardContentStyle,
  cardTextStyle,
  cardTitleStyle, 
} from './index.css';

export interface CalendarCardProps {
  status: AdjustmentStatus; 
  size?: 'sm' | 'md' | 'lg';
  title: string;
  startTime: Date | null;
  endTime: Date | null;
  style: CSSProperties;
  onClickGoogle?: () => void;
  onClickEdit?: () => void;
}

const CalendarCardChip = ({ status, size }: Pick<CalendarCardProps, 'status' | 'size'>) => {
  if (size === 'sm' || size === 'md') return null;

  return (
    <Chip color={adjustmentStatusMap[status].color}>
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

const CalendarTitle = ({ size, title }: Pick<CalendarCardProps, 'title' | 'size'>) => (
  <Text
    className={cardTitleStyle({ size })}
    color={vars.color.Ref.Netural[800]}
    typo={size === 'sm' ? 't3' : 't1'}
  >
    {title}
  </Text>
);
  
export const CalendarCard = ({ 
  status, 
  size = 'lg', 
  title, 
  startTime, 
  endTime, 
  onClickEdit, 
  onClickGoogle, 
  style, 
}: CalendarCardProps) => (
  <div className={cardContainerStyle({ status, size })} style={style}>
    <Flex
      className={cardBackgroundStyle({ size })}
      direction={size === 'lg' ? 'column' : 'row'}
      justify='flex-start'
    >
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
          <CalendarTitle size={size} title={title} />
        </Flex>
      </Flex>
      <CardBottom
        onClickEdit={onClickEdit}
        onClickGoogle={onClickGoogle}
        size={size}
      />
    </Flex>
  </div>
);