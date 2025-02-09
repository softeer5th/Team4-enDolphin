
import { useState } from 'react';

import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import { containerStyle, mainContainerStyle, titleStyle } from './index.css';
import ScheduleContents from './ScheduleDetails';
import UnconfirmedScheduleList from './UnconfirmedScheduleList';

const segmentOptions = [
  { label: '모든 일정', value: 'all' },
  { label: '내가 만든 일정', value: 'mine' },
  { label: '공유 받은 일정', value: 'shared' },
];
const UnConfirmedSchedules = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const schedules = [{}, {}, {}];
  const currentSchedule = {};

  return  (
    <Flex
      className={containerStyle}
      direction='column'
      justify='flex-start'
      width='full'
    >
      <Text className={titleStyle} typo='h2'>확정되지 않은 일정</Text>
      <SegmentControl onChange={(value) => setSelectedSegment(value)} options={segmentOptions} />
      <div className={mainContainerStyle}>
        <UnconfirmedScheduleList schedules={schedules} />
        <ScheduleContents schedule={currentSchedule} />
      </div >
    </Flex>
  );
};

export default UnConfirmedSchedules;