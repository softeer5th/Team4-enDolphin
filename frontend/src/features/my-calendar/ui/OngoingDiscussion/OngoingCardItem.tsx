import { type PropsWithChildren } from 'react';

import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { CalendarCheck, Clock } from '@/components/Icon';
import { Text } from '@/components/Text';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { vars } from '@/theme/index.css';
import { getDateRangeString } from '@/utils/date';

import { cardStyle, cardTextStyle } from './index.css';

interface OngoingCardItemProps extends Omit<OngoingSchedule, 'discussionId'> {
  onClick: () => void;
  isSelected: boolean;
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
  
export const OngoingCardItem = (
  { title, dateRangeStart, dateRangeEnd, timeLeft, onClick, isSelected }: OngoingCardItemProps,
) => (
  <Flex
    className={cardStyle({ selected: isSelected })}
    direction='column'
    gap={300}
    onClick={onClick}
    width='100%'
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
        {/** TODO: 홈 머지 후 시간 추가 */}
      </OngoingText>
      <OngoingText>
        <Clock width={15} />
        마감까지 
        {' '}
        {timeLeft}
        {/** TODO: 홈 머지 후 시간 추가 */}
      </OngoingText>
    </Flex>
  </Flex>
);
  