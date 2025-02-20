import { Link } from '@tanstack/react-router';

import Avatar from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateTimeRangeString } from '@/utils/date';
import { formatDateToDdayString } from '@/utils/date/format';

import type { UpcomingSchedule } from '../../model';
import {
  dotStyle,
  scheduleItemContainerStyle,
} from './upcomingScheduleListItem.css';

interface UpcomingScheduleListItemProps {
  schedule: UpcomingSchedule;
  onClick?: () => void;
}

const UpcomingScheduleListItem = ({
  schedule,
}: UpcomingScheduleListItemProps) => {
  const [startDate, endDate] = [
    new Date(schedule.sharedEventDto.startDateTime),
    new Date(schedule.sharedEventDto.endDateTime),
  ];

  return (
    <Link
      className={scheduleItemContainerStyle}
      params={{ id: schedule.discussionId.toString() }}
      state={{
        candidate: {
          adjustCount: 0,
          startDateTime: schedule.sharedEventDto.startDateTime,
          endDateTime: schedule.sharedEventDto.endDateTime,
        },
      }}
      to='/discussion/candidate/$id'
    >
      <Content
        endDate={endDate}
        schedule={schedule}
        startDate={startDate}
      />
    </Link>
  );
};

interface ContentProps {
  schedule: UpcomingScheduleListItemProps['schedule'];
  startDate: Date;
  endDate: Date;
}

const Content = ({
  schedule,
  startDate,
  endDate,
}: ContentProps) => (
  <>
    <Flex
      align='center'
      gap={200}
      height={24}
      justify='flex-start'
    >
      <Text typo='t2'>{schedule.title}</Text>
      <Chip color='black' style='weak'>
        {formatDateToDdayString(startDate)}
      </Chip>
    </Flex>
    <Flex
      align='center'
      justify='space-between'
      width='full'
    >
      <Flex gap={200}>
        <MeetDate endDate={endDate} startDate={startDate} />
        <MeetingPlace meetingPlace={schedule.meetingMethodOrLocation} />
      </Flex>
      <Avatar imageUrls={schedule.participantPictureUrls} size='sm' />
    </Flex>
  </>
);

const MeetDate = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
    {getDateTimeRangeString(startDate, endDate)}
  </Text>
);

const MeetingPlace = ({ meetingPlace }: { meetingPlace?: string }) => (
  meetingPlace && 
  <>
    <div className={dotStyle} />
    <Text color={vars.color.Ref.Netural[600]} typo='b3R'>{meetingPlace}</Text>
  </>
);

export default UpcomingScheduleListItem;