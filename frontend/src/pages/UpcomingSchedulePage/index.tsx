import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import UpcomingSchedules from '@/features/shared-schedule/ui/UpcomingSchedules';
import UpcomingScheduleList 
  from '@/features/shared-schedule/ui/UpcomingSchedules/UpcomingScheduleList';

import { containerStyle } from './index.css';

const UpcomingSchedulePage = () => {
  const schedules = [{}, {}, {}, {}, {}];
  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={700}
    > 
      <Flex
        direction='column'
        gap={700}
        justify='space-between'
        width='full'
      >
        <Text typo='h2'>다가오는 일정</Text>
        <UpcomingSchedules />
      </Flex>
      <UpcomingScheduleList schedules={schedules} />
    </Flex>
  );
};

export default UpcomingSchedulePage;