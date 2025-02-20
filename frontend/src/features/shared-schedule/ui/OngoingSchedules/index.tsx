
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import { ongoingQueryKey } from '../../api/keys';
import { prefetchOngoingSchedules } from '../../api/prefetch';
import type { AttendType, OngoingSchedulesResponse } from '../../model/';
import OngoingFallback from '../Fallbacks/OngoingFallback';
import { containerStyle, mainContainerStyle, segmentControlStyle, titleStyle } from './index.css';
import OngoingScheduleList, { PAGE_SIZE } from './OngoingScheduleList';
import ScheduleContents from './ScheduleDetails';

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
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(1);
  
  if (queryClient.getQueryData<OngoingSchedulesResponse>(
    ongoingQueryKey.detail(1, 6, 'ALL'),
  )?.totalPages === 0)
    return <OngoingFallback />;
  
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
          <div className={mainContainerStyle} >
            <OngoingScheduleList 
              onSelect={(id) => setSelectedDiscussionId(id)}
              segmentOption={option} 
              selectedId={selectedDiscussionId}
            />
            <ScheduleContents discussionId={selectedDiscussionId} />
          </div>
        </SegmentControl.Content>
      ))}
    </SegmentControl>
  );
};

export default OngoingSchedules;