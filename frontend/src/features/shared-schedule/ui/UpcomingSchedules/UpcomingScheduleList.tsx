
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';

import UpcomingScheduleListItem from './UpcomingScheduleListItem';

interface ScheduleListProps extends PropsWithChildren {
  schedules: object[];
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
      {schedules.map((_, index) => (
        <UpcomingScheduleListItem
          endDate={new Date()}
          key={index}
          participantImageUrls={['https://picsum.photos/200']}
          scheduleTitle='제목'
          startDate={new Date()}
        />))}
    </Flex>
  </Flex>
);

export default UpcomingScheduleList;
