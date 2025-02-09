
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import ScheduleListItem from '../UnconfirmedSchedules/ScheduleListItem';
import { paginationStyle } from './ScheduleList.css';

interface ScheduleListProps extends PropsWithChildren {
  schedules: object[];
}

const ScheduleList = ({ schedules }: ScheduleListProps) => (
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
        <ScheduleListItem
          key={index}
          participantImageUrls={['https://picsum.photos/200']}
          scheduleTitle='제목'
          selected={false}
        />))}
    </Flex>
    <Pagination
      className={paginationStyle}
      currentPage={1}
      onPageChange={()=>{ /**/ }}
      totalPages={5}
    />
  </Flex>
);

ScheduleList.Item = ScheduleListItem;

export default ScheduleList;