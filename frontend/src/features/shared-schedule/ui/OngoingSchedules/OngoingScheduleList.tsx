
import { useQueryClient } from '@tanstack/react-query';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';

import { prefetchOngoingSchedules } from '../../api/prefetch';
import { useOngoingQuery } from '../../api/queries';
import type { OngoingSegmentOption } from '.';
import { paginationStyle } from './ongoingScheduleList.css';
import OngoingScheduleListItem from './OngoingScheduleListItem';

export const ONGOING_PAGE_SIZE = 6;

interface OngoingScheduleListProps {
  segmentOption: OngoingSegmentOption;
  onSelect: (discussionId: number) => void;
}

const OngoingScheduleList = ({ segmentOption, onSelect }: OngoingScheduleListProps) => {
  const queryClient = useQueryClient();
  const paginationProps = usePagination(1);
  const { data, isPending } = useOngoingQuery(1, ONGOING_PAGE_SIZE, segmentOption.value);
  if (isPending) return <div>pending...</div>;
  if (!data || data.ongoingDiscussions.length === 0) return <div>no data available</div>;
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
        height='30rem'
        justify='flex-start'
        width='full'
      >
        {schedules.map((schedule, index) => (
          <OngoingScheduleListItem
            key={index}
            onSelect={(id) => onSelect(id)}
            schedule={schedule}
            selected={false}
          />))}
      </Flex>
      <Pagination
        className={paginationStyle}
        {...paginationProps}
        prefetchCallback={(page) => prefetchOngoingSchedules(
          queryClient, page, ONGOING_PAGE_SIZE, segmentOption.value,
        )}
        totalPages={data.totalPages}
      />
    </Flex>
  );
};

OngoingScheduleList.Item = OngoingScheduleListItem;

export default OngoingScheduleList;