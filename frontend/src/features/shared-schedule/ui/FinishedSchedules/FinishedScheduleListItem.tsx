import Avatar from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateTimeRangeString } from '@/utils/date';

import type { SharedEventDto } from '../../model';
import {
  dotStyle,
  scheduleItemContainerStyle,
} from './finishedScheduleListItem.css';

interface FinishedScheduleListItemProps {
  scheduleTitle: string;
  participantImageUrls: string[];
  meetingPlace?: string | null;
  sharedEventDto: SharedEventDto;
  // startDate: Date;
  // endDate: Date;
  onClick?: () => void;
}

const FinishedScheduleListItem = ({ 
  scheduleTitle,
  participantImageUrls,
  meetingPlace,
  sharedEventDto,
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
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <MeetDate sharedEventDto={sharedEventDto} /> 
        <MeetingPlace meetingPlace={meetingPlace} />
      </Flex>
      <Avatar imageUrls={participantImageUrls} size='sm' />
    </Flex>
  </Flex>
);

const MeetDate = ({ sharedEventDto }: { sharedEventDto: SharedEventDto }) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
    {sharedEventDto ? getDateTimeRangeString(
      sharedEventDto.startDateTime, 
      sharedEventDto.endDateTime)
      : '조율되지 않은 일정이에요'}
  </Text>
);

const MeetingPlace = ({ meetingPlace }: { meetingPlace?: string | null }) => (
  meetingPlace && 
    <>
      <div className={dotStyle} />
      <Text color={vars.color.Ref.Netural[600]} typo='b3R'>{getMeetingPlace(meetingPlace)}</Text>
    </>
);

const getMeetingPlace = (meetingPlace: string | null) => {
  if (!meetingPlace) return null;
  if (meetingPlace === 'OFFLINE') return '오프라인 모임';
  if (meetingPlace === 'ONLINE') return '온라인 모임';
  return meetingPlace;
};

export default FinishedScheduleListItem;