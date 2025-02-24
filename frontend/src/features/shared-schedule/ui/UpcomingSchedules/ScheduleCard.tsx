import { Link } from '@tanstack/react-router';

import Avatar from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { ChevronRight } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { getDateTimeRangeString } from '@/utils/date';
import { formatDateToDdayString } from '@/utils/date/format';

import type { UpcomingSchedule } from '../../model';
import { chevronButtonStyle, containerStyle } from './scheduleCard.css';

interface ScheduleCardProps {
  schedule: UpcomingSchedule;
  latest: boolean;
}

const ScheduleCard = ({ schedule, latest }: ScheduleCardProps) => (
  <Link
    params={{ id: schedule.discussionId.toString() }}
    state={{ 
      upcomingScheduleDetail: {
        title: schedule.title,
        startDateTime: schedule.sharedEventDto.startDateTime,
        endDateTime: schedule.sharedEventDto.endDateTime,
      },
    }}
    to='/upcoming-schedule/$id'
  >
    <Flex
      className={containerStyle({ latest })}
      direction='column'
      justify='space-between'
    >
      <ScheduleCardBody latest={latest} schedule={schedule} />
      <ScheduleCardFooter latest={latest} schedule={schedule} />
    </Flex>
  </Link>
);

const ScheduleCardBody = ({ schedule, latest }: {
  schedule: ScheduleCardProps['schedule']; latest: boolean; 
}) => (
  <Flex direction='column' gap={300}>
    <DdayChip endDateTime={new Date(schedule.sharedEventDto.endDateTime)} latest={latest} />
    <Text typo='h3'>{schedule.title}</Text>
    <Flex direction='column'>
      <MeetingDateTimeInfo 
        endDateTime={new Date(schedule.sharedEventDto.endDateTime)}
        startDateTime={new Date(schedule.sharedEventDto.startDateTime)}
      />
      <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
        {schedule.meetingMethodOrLocation}
      </Text>
    </Flex>
  </Flex>
);

const DdayChip = ({ endDateTime, latest }: {
  endDateTime: Date;
  latest: boolean;
}) => (
  <Chip
    color={latest ? 'black' : 'coolGray'}
    radius='max'
    size='md'
    style={latest ? 'filled' : 'weak'}
  >
    {formatDateToDdayString(endDateTime)}
  </Chip>
);

const ScheduleCardFooter = ({ schedule, latest }: {
  schedule: ScheduleCardProps['schedule']; latest: boolean; 
}) => (
  <Flex
    align='center'
    justify='space-between'
    width='full'
  >
    <Avatar imageUrls={schedule.participantPictureUrls} size='lg' />
    <ChevronButton latest={latest} />
  </Flex>
);

const MeetingDateTimeInfo = ({ startDateTime, endDateTime }: {
  startDateTime: Date;
  endDateTime: Date;
}) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
    {getDateTimeRangeString(startDateTime, endDateTime)}
  </Text>
);

const ChevronButton = ({ latest }: { latest: boolean }) => (
  <ChevronRight
    className={chevronButtonStyle({ latest })}
    clickable
    fill={vars.color.Ref.Netural[800]}
  />
);

export default ScheduleCard;