
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import { useOngoingQuery } from '../../api/queries';
import type { OngoingSegmentOption } from '.';
import { paginationStyle } from './ongoingScheduleList.css';
import OngoingScheduleListItem from './OngoingScheduleListItem';

const PAGE_SIZE = 6;

interface OngoingScheduleListProps {
  segmentOption: OngoingSegmentOption;
}

const OngoingScheduleList = ({ segmentOption }: OngoingScheduleListProps) => {
  const [page, setPage] = useState(1);
  const { data, isPending } = useOngoingQuery(page, PAGE_SIZE, segmentOption.value);
  if (isPending) return <div>pending...</div>;
  if (!data) return <div>No data available</div>;
  const schedules = data.ongoingDiscussions;

  return (
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
          <OngoingScheduleListItem
            key={index}
            participantImageUrls={schedule.participantPictureUrls}
            scheduleTitle='제목'
            selected={false}
          />))}
      </Flex>
      <Pagination
        className={paginationStyle}
        currentPage={page}
        onPageChange={(page)=>setPage(page)}
        totalPages={data.totalPages}
      />
    </Flex>
  );
};

OngoingScheduleList.Item = OngoingScheduleListItem;

export default OngoingScheduleList;