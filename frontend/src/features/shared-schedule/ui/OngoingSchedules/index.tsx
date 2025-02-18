
import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import type { AttendType } from '../../model/';
import { containerStyle, mainContainerStyle, segmentControlStyle, titleStyle } from './index.css';
import OngoingScheduleList from './OngoingScheduleList';
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
    <SegmentControl
      className={segmentControlStyle}
      defaultValue='ALL'
      segmentOptions={segmentOptions}
    >
      {segmentOptions.map((option, idx) => (
        <SegmentControl.Content key={`${option.value}-${idx}`} value={option.value}>
          <div className={mainContainerStyle} >
            <OngoingScheduleList segmentOption={option} />
            {/* <ScheduleContents discussion={} /> */}
          </div>
        </SegmentControl.Content>
      ))}
    </SegmentControl>
  </Flex>
);

export default OngoingSchedules;