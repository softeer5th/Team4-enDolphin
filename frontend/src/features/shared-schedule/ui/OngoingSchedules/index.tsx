
import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import type { OngoingQueryType } from '../../model';
import { containerStyle, mainContainerStyle, titleStyle } from './index.css';
import OngoingScheduleList from './OngoingScheduleList';
import ScheduleContents from './ScheduleDetails';

export interface OngoingSegmentOption {
  label: string;
  value: OngoingQueryType;
}

const segmentOptions: OngoingSegmentOption[] = [
  { label: '모든 일정', value: 'ALL' },
  { label: '내가 만든 일정', value: 'HOST' },
  { label: '공유 받은 일정', value: 'ATTENDEE' },
];

const UnConfirmedSchedules = () => (
  <Flex
    className={containerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <Text className={titleStyle} typo='h2'>확정되지 않은 일정</Text>
    <SegmentControl defaultValue='모든 일정' segmentOptions={segmentOptions}>
      {segmentOptions.map((option, idx) => (
        <div className={mainContainerStyle}>
          <SegmentControl.Content key={`${option.value}-${idx}`} value={option.value}>
            <OngoingScheduleList segmentOption={option} />
            <ScheduleContents />
          </SegmentControl.Content>
        </div >
      ))}
    </SegmentControl>
  </Flex>
);

export default UnConfirmedSchedules;