import type { PropsWithChildren, RefObject  } from 'react';

import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { CalendarCheck, Clock } from '@/components/Icon';
import { Text } from '@/components/Text';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { vars } from '@/theme/index.css';
import { getDateRangeString, getTimeRangeString, parseTime } from '@/utils/date';
import { formatMinutesToTimeDuration } from '@/utils/date/format';

import { cardStyle, cardTextStyle } from './index.css';

interface OngoingCardItemProps extends Omit<OngoingSchedule, 'discussionId'> {
  onClick: () => void;
  isSelected: boolean;
  ref: RefObject<HTMLDivElement | null>;
}
  
const OngoingText = ({ children }: PropsWithChildren) => (
  <Text
    className={cardTextStyle}
    color={vars.color.Ref.Netural[600]}
    typo='b3M'
  >
    {children}
  </Text>
);
  
export const OngoingCardItem = ({ 
  title, 
  dateRangeStart, 
  dateRangeEnd, 
  timeRangeStart,
  timeRangeEnd, 
  duration, 
  onClick, 
  isSelected,
  ref, 
}: OngoingCardItemProps) => (
  <div
    className={cardStyle({ selected: isSelected })}
    onClick={onClick}
    ref={ref}
  >
    <Text color={vars.color.Ref.Netural[800]} typo='t2'>{title}</Text>
    <Divider height={2} />
    <Flex
      direction='column'
      gap={100}
      width='100%'
    >
      <OngoingText>
        <CalendarCheck width={15} />
        {getDateRangeString(dateRangeStart, dateRangeEnd)}
      </OngoingText>
      <OngoingText>
        <Clock width={15} />
        {getTimeRangeString(parseTime(timeRangeStart), parseTime(timeRangeEnd))}
      </OngoingText>
      <OngoingText>
        <Clock width={15} />
        {formatMinutesToTimeDuration(duration)}
      </OngoingText>
    </Flex>
  </div>
);
  