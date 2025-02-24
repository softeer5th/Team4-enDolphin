
import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateRangeString, getTimeLeftInfoFromMilliseconds } from '@/utils/date';
import { formatTimeToDeadlineString } from '@/utils/date/format';

import type { OngoingSchedule } from '../../model';
import {
  detailsContainerStyle,
  scheduleItemContainerStyle,
  updateIndicatorStyle,
} from './ongoingScheduleListItem.css';

interface OngoingScheduleListItemProps {
  schedule: OngoingSchedule;
  selected: boolean;
  isUpdated?: boolean;
  onClick: () => void;
}

// TODO: prefetching 구현
const OngoingScheduleListItem = ({
  schedule, selected, isUpdated = false, onClick, 
}: OngoingScheduleListItemProps) => (
  <div
    className={scheduleItemContainerStyle({ selected })}
    onClick={onClick}
  >
    <Flex
      align='center'
      gap={200}
      height={24}
      justify='flex-start'
    >
      <span className={updateIndicatorStyle({ isUpdated })} />
      <Text typo='t2'>{schedule.title}</Text>
      <Deadline timeLeft={schedule.timeLeft} />
    </Flex>
    <Flex
      align='center'
      className={detailsContainerStyle}
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
          {getDateRangeString(schedule.dateRangeStart, schedule.dateRangeEnd)}
        </Text>
      </Flex>
      <Avatar imageUrls={schedule.participantPictureUrls} size='sm' />
    </Flex>
  </div>
);

const Deadline = ({ timeLeft }: { timeLeft: number }) => {
  const timeLeftInfo = getTimeLeftInfoFromMilliseconds(timeLeft);
  if (timeLeftInfo.days > 3) return null;
  const isExpired = timeLeft < 0;
  return (
    <Text color={vars.color.Ref.Red[500]} typo='b3M'>
      {isExpired ? 
        `마감 기한이 ${formatTimeToDeadlineString(timeLeftInfo)} 지났어요`
        : 
        `마감 기한까지 ${formatTimeToDeadlineString(timeLeftInfo)} 남았어요!`}
    </Text>
  );
};

export default OngoingScheduleListItem;
