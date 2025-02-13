import Avatar from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { isSameDate } from '@/utils/date';

import {
  dotStyle,
  scheduleItemContainerStyle,
} from './upcomingScheduleListItem.css';

interface UpcomingScheduleListItemProps {
  scheduleTitle: string;
  participantImageUrls: string[];
  meetingPlace?: string;
  startDate: Date;
  endDate: Date;
  onClick?: () => void;
}

const UpcomingScheduleListItem = ({ 
  scheduleTitle,
  participantImageUrls,
  meetingPlace,
  startDate,
  endDate,
}: UpcomingScheduleListItemProps) => (
  <Flex
    className={scheduleItemContainerStyle}
    direction='column'
    gap={50}
  >
    <Flex
      align='center'
      gap={200}
      height={24}
      justify='flex-start'
    >
      <Text typo='t2'>{scheduleTitle}</Text>
      <Chip color='black' style='weak'>{getDDay(startDate)}</Chip>
    </Flex>
    <Flex
      align='center'
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <MeetDate endDate={endDate} startDate={startDate} />
        <MeetingPlace meetingPlace={meetingPlace} />
      </Flex>
      <Avatar imageUrls={participantImageUrls} size='sm' />
    </Flex>
  </Flex>
);

const MeetingPlace = ({ meetingPlace }: { meetingPlace?: string }) => (
  meetingPlace && 
  <>
    <div className={dotStyle} />
    <Text color={vars.color.Ref.Netural[600]} typo='b3R'>{meetingPlace}</Text>
  </>
);

const MeetDate = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
    {`${startDate.toLocaleDateString()} ~ `}
    {isSameDate(startDate, endDate) ? 
      endDate.toLocaleDateString()
      :
      endDate.toLocaleDateString().slice(5)}
  </Text>
);
const getDDay = (startDate: Date) => {
  const today = new Date();
  const timeDiff = startDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (dayDiff > 0) return `D-${dayDiff}`;
  if (dayDiff < 0) return `D+${Math.abs(dayDiff)}`;
  return 'D-Day';
};

export default UpcomingScheduleListItem;