
import { useQueryClient } from '@tanstack/react-query';

import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import { ongoingQueryKey } from '../../api/keys';
import { prefetchOngoingSchedules } from '../../api/prefetch';
import { useOngoingQuery } from '../../api/queries';
import { sharedSchedulesQueryOptions } from '../../api/queryOptions';
import type { AttendType, OngoingSchedulesResponse } from '../../model/';
import { ongoingFallbackContainerStyle } from '../Fallbacks/index.css';
import OngoingFallback from '../Fallbacks/OngoingFallback';
import { containerStyle, segmentControlStyle, titleStyle } from './index.css';
import OngoingScheduleList, { PAGE_SIZE } from './OngoingScheduleList';

export interface OngoingSegmentOption {
  label: string;
  value: AttendType;
}

const segmentOptions: OngoingSegmentOption[] = [
  { label: '모든 일정', value: 'ALL' },
  { label: '내가 만든 일정', value: 'HOST' },
  { label: '공유 받은 일정', value: 'ATTENDEE' },
];

const OngoingSchedules = () => (
  <Flex
    className={containerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <Text className={titleStyle} typo='h2'>확정되지 않은 일정</Text>
    <Content />
  </Flex>
);

const Content = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useOngoingQuery(1, 6, 'ALL');
  if (!data || isPending) return <div className={ongoingFallbackContainerStyle} />;
  if (data.totalPages === 0) {
    queryClient.fetchQuery(sharedSchedulesQueryOptions.ongoing(1, 6, 'ALL'));
    return <OngoingFallback />;
  }
  
  return (
    <SegmentControl
      className={segmentControlStyle}
      defaultValue='ALL'
      onButtonHover={(value) => prefetchOngoingSchedules(
        // TODO: segmentOption value의 타입을 제네릭으로 지정할 수 있게 구현 (as 변환 리팩토룅)
        queryClient, 1, PAGE_SIZE, value as AttendType,
      )}
      segmentOptions={segmentOptions}
    >
      {segmentOptions.map((option, idx) => (
        <SegmentControl.Content key={`${option.value}-${idx}`} value={option.value}>
          <OngoingScheduleList 
            segmentOption={option} 
          />
        </SegmentControl.Content>
      ))}
    </SegmentControl>
  );
};

export default OngoingSchedules;