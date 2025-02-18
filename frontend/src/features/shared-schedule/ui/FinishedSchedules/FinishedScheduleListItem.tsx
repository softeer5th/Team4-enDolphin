import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { isSameDate } from '@/utils/date';

import {
  detailsContainerStyle,
  dotStyle,
  scheduleItemContainerStyle,
} from './finishedScheduleListItem.css';

interface FinishedScheduleListItemProps {
  scheduleTitle: string;
  participantImageUrls: string[];
  meetingPlace?: string;
  startDate: Date;
  endDate: Date;
  onClick?: () => void;
}

const FinishedScheduleListItem = ({ 
  scheduleTitle,
  participantImageUrls,
  meetingPlace,
  startDate,
  endDate,
}: FinishedScheduleListItemProps) => (
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
    </Flex>
    <Flex
      align='center'
      className={detailsContainerStyle}
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

export default FinishedScheduleListItem;