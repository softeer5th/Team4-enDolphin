import type { PropsWithChildren } from 'react';

import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';
import { CalendarCheck, Clock } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useOngoingQuery } from '@/features/shared-schedule/api/queries';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { vars } from '@/theme/index.css';
import { getDateRangeString } from '@/utils/date';

import { cardStyle, cardTextStyle } from './index.css';

const OngoingText = ({ children }: PropsWithChildren) => (
  <Text
    className={cardTextStyle}
    color={vars.color.Ref.Netural[600]}
    typo='b3M'
  >
    {children}
  </Text>
);

const OngoingCardItem = (
  { title, dateRangeStart, dateRangeEnd, timeLeft }: OngoingSchedule,
) => (
  <Flex
    className={cardStyle}
    direction='column'
    gap={300}
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

export const OngoingCardList = () => {
  const { data, isPending } = useOngoingQuery(1, 3, 'ALL');
  if (isPending || !data) return null;

  return data.ongoingDiscussions.map((discussion) => (
    <OngoingCardItem {...discussion} />
  ));
};