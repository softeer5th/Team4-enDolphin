
import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import { paginationStyle } from './index.css';
import ScheduleListItem from './scheduleListItem';

interface ScheduleListProps {
  schedule: object;
}

const ScheduleList = ({ schedule }: ScheduleListProps) => (
  <Flex
    direction='column'
    gap={600}
    justify='flex-start'
    width='full'
  >
    <Flex
      direction='column'
      justify='flex-start'
      width='full'
    >
      <ScheduleListItem schedule={schedule} selected={true} />
      <ScheduleListItem schedule={schedule} selected={false} />
      <ScheduleListItem schedule={schedule} selected={false} />
      <ScheduleListItem schedule={schedule} selected={false} />
      <ScheduleListItem schedule={schedule} selected={false} />
      <ScheduleListItem schedule={schedule} selected={false} />
    </Flex>
    <Pagination
      className={paginationStyle}
      currentPage={1}
      onPageChange={()=>{ /**/ }}
      totalPages={5}
    />
  </Flex>
);

export default ScheduleList;