import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import Pagination from '@/components/Pagination';
import { Text } from '@/components/Text';
import { usePagination } from '@/hooks/usePagination';
import { vars } from '@/theme/index.css';

import { prefetchOngoingSchedules } from '../../api/prefetch';
import { useOngoingQuery } from '../../api/queries';
import type { OngoingSegmentOption } from '.';
import { mainContainerStyle } from './index.css';
import { paginationStyle } from './ongoingScheduleList.css';
import OngoingScheduleListItem from './OngoingScheduleListItem';
import ScheduleContents from './ScheduleDetails';

export const PAGE_SIZE = 6;

const NoDataAlt = ({ segmentValue }: { segmentValue: string }) => (
  <Flex
    align='center'
    height={637}
    justify='center'
    width='full'
  >
    <Text color={vars.color.Ref.Netural[600]} typo='h3'>
      {segmentValue === 'HOST' ? '내가 만든 일정이 없어요' : '공유받은 일정이 없어요'}
    </Text>
  </Flex>
);

interface OngoingScheduleListProps {
  segmentOption: OngoingSegmentOption;
}

// TODO: useEffect 뺄 수 있으면 다른 걸로 대체
const OngoingScheduleList = ({ segmentOption }: OngoingScheduleListProps) => {
  const queryClient = useQueryClient();
  const { currentPage, onPageChange } = usePagination(1);
  const { data, isPending } = useOngoingQuery(currentPage, PAGE_SIZE, segmentOption.value );
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (isPending) return <div>pending...</div>;
  if (!data || data.ongoingDiscussions.length === 0) 
    return <NoDataAlt segmentValue={segmentOption.value} />;

  return (
    <div className={mainContainerStyle}>
      <Flex
        direction='column'
        gap={600}
        justify='space-between'
        width='full'
      >
        <ScheduleItems
          schedules={data.ongoingDiscussions}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Pagination
          className={paginationStyle}
          currentPage={currentPage}
          onPageButtonHover={(page) =>
            prefetchOngoingSchedules(queryClient, page, PAGE_SIZE, segmentOption.value )}
          onPageChange={onPageChange}
          totalPages={data.totalPages}
        />
      </Flex>
      <ScheduleContents discussionId={data.ongoingDiscussions[selectedIndex].discussionId} />
    </div>
  );
};

interface ScheduleItemsProps {
  schedules: NonNullable<
    ReturnType<typeof useOngoingQuery>['data']
  >['ongoingDiscussions'];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ScheduleItems = ({ schedules, selectedIndex, setSelectedIndex }: ScheduleItemsProps) => (
  <Flex
    direction='column'
    height='30rem'
    justify='flex-start'
    width='full'
  >
    {schedules.map((schedule, index) => (
      <OngoingScheduleListItem
        key={index}
        onClick={() => setSelectedIndex(index)}
        schedule={schedule}
        selected={selectedIndex === index}
      />
    ))}
  </Flex>
);

OngoingScheduleList.Item = OngoingScheduleListItem;
export default OngoingScheduleList;
