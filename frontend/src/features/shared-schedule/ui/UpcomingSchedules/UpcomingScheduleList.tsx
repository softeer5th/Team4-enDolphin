
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';

import type { UpcomingSchedule } from '../../model';
import UpcomingScheduleListItem from './UpcomingScheduleListItem';

interface ScheduleListProps extends PropsWithChildren {
  schedules: UpcomingSchedule[];
}

// TODO: 무한 스크롤로 구현
const UpcomingScheduleList = ({ schedules }: ScheduleListProps) => (
  <Flex
    direction='column'
    gap={600}
    justify='space-between'
    width='full'
  >
    <Flex
      direction='column'
      justify='flex-start'
      width='full'
    >
      {schedules.map((schedule, index) => (
        <UpcomingScheduleListItem
          endDate={schedule.sharedEventDto.endDateTime}
          key={`${schedule.discussionId}-${index}`}
          participantImageUrls={schedule.participantPictureUrls}
          scheduleTitle={schedule.title}
          startDate={schedule.sharedEventDto.startDateTime}
        />))}
    </Flex>
  </Flex>
);

export default UpcomingScheduleList;
