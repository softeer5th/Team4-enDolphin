
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import { useFinishedQuery } from '../../api/queries';
import FinishedFallback from '../Fallbacks/FinishedFallback';
import { paginationStyle } from './finishedScheduleList.css';
import FinishedScheduleListItem from './FinishedScheduleListItem';

export const FINISHED_PAGE_SIZE = 7;

interface FinishedScheduleListProps {
  baseYear: number;
}

const FinishedScheduleList = ({ baseYear }: FinishedScheduleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending } = useFinishedQuery(currentPage, FINISHED_PAGE_SIZE, baseYear);
  if (isPending) return <div>pending...</div>;
  if (!data) return <div>data is undefined or null</div>;
  if (data.finishedDiscussions.length === 0) return <FinishedFallback />;

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
        {data.finishedDiscussions.map((schedule) => (
          <FinishedScheduleListItem
            endDate={schedule.sharedEventDto.endDateTime}
            key={schedule.id}
            participantImageUrls={schedule.participantPictureUrls}
            scheduleTitle={schedule.title}
            startDate={schedule.sharedEventDto.startDateTime}
          />))}
      </Flex>
      <Pagination
        className={paginationStyle}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={data.totalPages}
      />
    </Flex>
  ); 
};

export default FinishedScheduleList;