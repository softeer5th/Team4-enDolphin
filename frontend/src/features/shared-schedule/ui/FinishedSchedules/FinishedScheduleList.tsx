
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';

import { useFinishedQuery } from '../../api/queries';
import FinishedFallback from '../Fallbacks/FinishedFallback';
import { paginationStyle, scheduleListStyle } from './finishedScheduleList.css';
import FinishedScheduleListItem from './FinishedScheduleListItem';

export const FINISHED_PAGE_SIZE = 7;

interface FinishedScheduleListProps {
  baseYear: number;
}

const FinishedScheduleList = ({ baseYear }: FinishedScheduleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending } = useFinishedQuery(currentPage, FINISHED_PAGE_SIZE, baseYear);
  if (isPending || !data) return <div className={scheduleListStyle} />;
  if (data.finishedDiscussions.length === 0) return <FinishedFallback />;

  return (
    <div className={scheduleListStyle} >
      <Flex
        direction='column'
        height='100%'
        justify='flex-start'
        width='full'
      >
        {data.finishedDiscussions.map((schedule) => (
          <FinishedScheduleListItem
            endDate={new Date(schedule.sharedEventDto.endDateTime)}
            key={schedule.discussionId}
            meetingPlace={schedule.meetingMethodOrLocation}
            participantImageUrls={schedule.participantPictureUrls}
            scheduleTitle={schedule.title}
            startDate={new Date(schedule.sharedEventDto.startDateTime)}
          />))}
      </Flex>
      <Pagination
        className={paginationStyle}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={data.totalPages}
      />
    </div>
  ); 
};

export default FinishedScheduleList;