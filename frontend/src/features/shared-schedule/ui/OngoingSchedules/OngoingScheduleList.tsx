import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';

import { prefetchOngoingSchedules } from '../../api/prefetch';
import { useOngoingQuery } from '../../api/queries';
import type { OngoingSegmentOption } from '.';
import { paginationStyle } from './ongoingScheduleList.css';
import OngoingScheduleListItem from './OngoingScheduleListItem';

export const PAGE_SIZE = 6;

interface OngoingScheduleListProps {
  segmentOption: OngoingSegmentOption;
  selectedId: number;
  onSelect: (discussionId: number) => void;
}

const OngoingScheduleList = ({ segmentOption, selectedId, onSelect }: OngoingScheduleListProps) => {
  const queryClient = useQueryClient();
  const { currentPage, onPageChange } = usePagination(1);
  const { data, isPending } = useOngoingQuery(currentPage, PAGE_SIZE, segmentOption.value );
  useEffect(() => {
    if (data && data.ongoingDiscussions.length > 0) {
      const exists = data.ongoingDiscussions.some(
        (schedule) => schedule.discussionId === selectedId,
      );
      if (!exists) onSelect(data.ongoingDiscussions[0].discussionId);
    }
  }, [data, selectedId, onSelect]);

  if (isPending) return <div>pending...</div>;
  if (!data || data.ongoingDiscussions.length === 0) return <div>no data available</div>;
  return (
    <Flex
      direction='column'
      gap={600}
      justify='space-between'
      width='full'
    >
      <ScheduleItems
        onSelect={onSelect}
        schedules={data.ongoingDiscussions}
        selectedId={selectedId}
      />
      {data.totalPages > 1 && (
        <Pagination
          className={paginationStyle}
          currentPage={currentPage}
          onPageButtonHover={(page) =>
            prefetchOngoingSchedules(queryClient, page, PAGE_SIZE, segmentOption.value )}
          onPageChange={onPageChange}
          totalPages={data.totalPages}
        />
      )}
    </Flex>
  );
};

interface ScheduleItemsProps {
  schedules: NonNullable<
    ReturnType<typeof useOngoingQuery>['data']
  >['ongoingDiscussions'];
  selectedId: number;
  onSelect: (discussionId: number) => void;
}

const ScheduleItems = ({ schedules, selectedId, onSelect }: ScheduleItemsProps) => (
  <Flex
    direction='column'
    height='30rem'
    justify='flex-start'
    width='full'
  >
    {schedules.map((schedule, index) => (
      <OngoingScheduleListItem
        key={index}
        onSelect={onSelect}
        schedule={schedule}
        selected={selectedId === schedule.discussionId}
      />
    ))}
  </Flex>
);

OngoingScheduleList.Item = OngoingScheduleListItem;
export default OngoingScheduleList;
