
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import { paginationStyle } from './unconfirmedScheduleList.css';
import UnconfimredScheduleListItem from './UnconfirmedScheduleListItem';

interface UnconfirmedScheduleListProps extends PropsWithChildren {
  schedules: object[];
}

const UnconfirmedScheduleList = ({ schedules }: UnconfirmedScheduleListProps) => (
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
        <UnconfimredScheduleListItem
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

UnconfirmedScheduleList.Item = UnconfimredScheduleListItem;

export default UnconfirmedScheduleList;