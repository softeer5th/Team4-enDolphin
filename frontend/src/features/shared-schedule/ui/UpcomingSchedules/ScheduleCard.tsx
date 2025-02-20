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
  <Flex
    className={containerStyle({ latest })}
    direction='column'
    justify='space-between'
  >
    <Flex direction='column' gap={300}>
      <DdayChip endDateTime={schedule.sharedEventDto.endDateTime} latest={latest} />
      <Text typo='h3'>{schedule.title}</Text>
      <Flex direction='column'>
        <MeetingDateTimeInfo 
          endDateTime={schedule.sharedEventDto.endDateTime}
          startDateTime={schedule.sharedEventDto.startDateTime}
        />
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {schedule.meetingMethodOrLocation}
        </Text>
      </Flex>
    </Flex>
    <Flex
      align='center'
      justify='space-between'
      width='full'
    >
      <Avatar imageUrls={schedule.participantPictureUrls} size='lg' />
      <NavigateButton latest={latest} schedule={schedule} />
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

const MeetingDateTimeInfo = ({ startDateTime, endDateTime }: {
  startDateTime: Date;
  endDateTime: Date;
}) => (
  <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
    {getDateTimeRangeString(startDateTime, endDateTime)}
  </Text>
);

export default ScheduleCard;

const NavigateButton = ({ latest, schedule }: {
  latest: boolean; 
  schedule: UpcomingSchedule;
}) => {
  const payload = {
    discussionId: schedule.discussionId,
    startDateTime: schedule.sharedEventDto.startDateTime,
    endDateTime: schedule.sharedEventDto.endDateTime,
  };
  return (
    <button className={chevronButtonStyle({ latest })}>
      <ChevronRight
        clickable
        fill={vars.color.Ref.Netural[800]}
        width={28}
      />
    </button>
  ); 
};
