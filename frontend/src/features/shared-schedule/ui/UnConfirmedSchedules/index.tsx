
import { Flex } from '@/components/Flex';
import SegmentControl from '@/components/SegmentControl';
import { Text } from '@/components/Text';

import { containerStyle, mainContainerStyle, titleStyle } from './index.css';
import ScheduleContents from './ScheduleDetails';
import UnconfirmedScheduleList from './UnconfirmedScheduleList';

const segmentValues = ['모든 일정', '내가 만든 일정', '공유 받은 일정'];
const UnConfirmedSchedules = () => {
  const schedules = [{}, {}, {}];

  return  (
    <Flex
      className={containerStyle}
      direction='column'
      justify='flex-start'
      width='full'
    >
      <Text className={titleStyle} typo='h2'>확정되지 않은 일정</Text>
      <SegmentControl defaultValue='모든 일정' values={segmentValues} />
      <div className={mainContainerStyle}>
        <UnconfirmedScheduleList schedules={schedules} />
        <ScheduleContents />
      </div >
    </Flex>
  );
};

export default UnConfirmedSchedules;